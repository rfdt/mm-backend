"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const stream_1 = require("stream");
const channel_schema_1 = require("./channel.schema");
const hardware_schema_1 = require("./hardware.schema");
const xlsx = require("xlsx");
const ftp = require("basic-ftp");
const transformToBase_1 = require("./utils/transformToBase");
let ChannelService = class ChannelService {
    constructor(ChannelModel, HardwareModel) {
        this.ChannelModel = ChannelModel;
        this.HardwareModel = HardwareModel;
    }
    async findAllChannels() {
        try {
            return await this.ChannelModel.find({});
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findChannelById(channel_id) {
        try {
            const channel = await this.ChannelModel.findOne({ _id: channel_id }).populate('channel_verified_user');
            return channel;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findChannels(filters, limit) {
        try {
            const query = {
                $and: [
                    { city: { $regex: filters.cityFilter, $options: "i" } },
                    { street: { $regex: filters.streetFilter, $options: "i" } },
                    { home: { $regex: filters.homeFilter, $options: "i" } },
                    { service: { $regex: filters.serviceFilter, $options: "i" } },
                    {
                        status: filters.statusFilter ? {
                            $regex: filters.statusFilter,
                            $options: "i"
                        } : { $in: ["ВКЛ", "ПАУЗА", "РЕЗЕРВ", "ОТКЛ"] }
                    },
                    {
                        $or: [
                            { id_tbcd: { $regex: filters.addInfoFilter, $options: "i" } },
                            { id_suz: { $regex: filters.addInfoFilter, $options: "i" } },
                            { id_cms: { $regex: filters.addInfoFilter, $options: "i" } },
                            { id_oss: { $regex: filters.addInfoFilter, $options: "i" } },
                            { client: { $regex: filters.addInfoFilter, $options: "i" } },
                            { add_info: { $regex: filters.addInfoFilter, $options: "i" } },
                            { note: { $regex: filters.addInfoFilter, $options: "i" } }
                        ]
                    },
                    {
                        $or: [
                            { inventory_channel_pe: { $regex: filters.peFilter, $options: "i" } },
                            { channel_pe: { $regex: filters.peFilter, $options: "i" } }
                        ]
                    },
                    {
                        $or: [
                            { inventory_channel_agg_stop: { $regex: filters.channelAggStopFilter, $options: "i" } },
                            { "channel_agg_stop.agg_stop": { $regex: filters.channelAggStopFilter, $options: "i" } }
                        ]
                    },
                    { rd_sr: { $regex: filters.rdFilter, $options: "i" } },
                    {
                        $or: [
                            { inventory_channel_vid: { $regex: filters.vidFilter, $options: "i" } },
                            { channel_vid: { $regex: filters.vidFilter, $options: "i" } }
                        ]
                    },
                    { service_size: { $regex: filters.sizeFilter, $options: "i" } },
                    {
                        $or: [
                            { inventory_channel_acc_stop: { $regex: filters.channelAccStopFilter, $options: "i" } },
                            { "channel_acc_stop.acc_stop": { $regex: filters.channelAccStopFilter, $options: "i" } }
                        ]
                    },
                    {
                        $or: [
                            { "channel_acc_stop.acc_ip_mng": { $regex: filters.channelIpMngFilter, $options: "i" } },
                            { inventory_channel_ip_mng_acc: { $regex: filters.channelIpMngFilter, $options: "i" } }
                        ]
                    }
                ]
            };
            const data = await Promise.all([
                this.ChannelModel.find(query, null, { sort: { "_id": -1 } }).count(),
                await this.ChannelModel.find(query, null, { sort: { "_id": -1 } }).limit(limit)
            ]);
            return ({ channels: data[1], count: data[0] });
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async gitFiltersValue() {
        try {
            const channels = await this.findAllChannels();
            const city = [];
            const streets = {};
            const services = [];
            const clients = [];
            channels.forEach(channel => {
                city.indexOf(channel.city) === -1 ? city.push(channel.city) : null;
                if (streets.hasOwnProperty(channel.city)) {
                    if (streets[channel.city].indexOf(channel.street) === -1) {
                        streets[channel.city].push(channel.street);
                    }
                }
                else {
                    streets[channel.city] = [];
                    streets[channel.city].push(channel.street);
                }
                services.indexOf(channel.service) === -1 ? services.push(channel.service) : null;
                clients.indexOf(channel.client) === -1 ? clients.push(channel.client) : null;
            });
            const hardwares = await this.getHardwareValues();
            return ({
                city, streets, services, clients,
                pe: hardwares[0],
                ssw: hardwares[1],
                stop: hardwares[2]
            });
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getChannelsCount() {
        try {
            return await this.ChannelModel.find({}).count();
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async testError() {
        throw new common_1.HttpException("Тестовая ошибка", common_1.HttpStatus.BAD_REQUEST);
    }
    async updateAndCreate(updatedChannelWithCreateDto) {
        try {
            const changedStatusField = await this.ChannelModel.findByIdAndUpdate(updatedChannelWithCreateDto._id, { status: "ИЗМ" }, { new: true });
            const newChannel = new this.ChannelModel({
                ...updatedChannelWithCreateDto,
                channel_ref: changedStatusField.channel_ref ? changedStatusField.channel_ref : updatedChannelWithCreateDto._id,
                _id: null
            });
            const newUpdatedChannel = await newChannel.save();
            return newUpdatedChannel;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateChannel(updateChannelDto) {
        try {
            const newChannel = { ...updateChannelDto };
            delete newChannel._id;
            const changedChannel = await this.ChannelModel.findByIdAndUpdate(updateChannelDto._id, { ...newChannel }, { new: true });
            return changedChannel;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createChannel(newChannel) {
        try {
            const newChannelDocument = new this.ChannelModel({ ...newChannel });
            return await newChannelDocument.save();
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async verifyChannel(verifiedChannelDto, userID) {
        try {
            const verifiedChannel = await this.ChannelModel
                .findByIdAndUpdate(verifiedChannelDto._id, { ...verifiedChannelDto,
                channel_verified: true,
                channel_verified_user: userID,
                channel_verified_date: new Date().toString()
            }, { new: true }).populate('channel_verified_user');
            return verifiedChannel;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getRelatedChannels(channelId) {
        try {
            const channel = await this.findChannelById(channelId);
            const relatedChannel = await this.ChannelModel.find({ _id: { $ne: channel._id }, channel_ref: channel.channel_ref }, null, { sort: { "_id": -1 } });
            const parentChannel = await this.findChannelById(String(channel.channel_ref));
            return relatedChannel.concat([parentChannel]);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getHardwareValues() {
        return await Promise.all([
            await this.HardwareModel.find({ hardware_type: "pe" }),
            await this.HardwareModel.find({ hardware_type: "ssw" }),
            await this.HardwareModel.find({ hardware_type: "stop" })
        ]);
    }
    async backupWithFtp() {
        try {
            const channels = await this.ChannelModel.find({});
            const transformed = channels ? (0, transformToBase_1.transformToBase)(channels) : [];
            const worksheet = xlsx.utils.json_to_sheet(transformed);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
            const excelBuffer = xlsx.write(workbook, { type: "buffer" });
            const excel_stream = stream_1.Readable.from(excelBuffer);
            const client = new ftp.Client();
            await client.access({
                host: "127.0.0.1",
                user: "ruslan",
                password: "vfvjxrf2525",
                secure: true,
                secureOptions: { rejectUnauthorized: false }
            });
            await client.uploadFrom(excel_stream, `Backup ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString().split(":").join("-")}.xlsx`);
            client.close();
            return ({ message: "Back up successfully" });
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createHardware(createHardwareDto) {
        try {
            const findedHardware = await this.HardwareModel.findOne({ title: createHardwareDto.title });
            if (findedHardware) {
                throw new mongoose_1.Error(`Hostname ${createHardwareDto.title} - Занят! Пожалуйста выберите другой.`);
            }
            const newHardware = new this.HardwareModel({
                ...createHardwareDto
            });
            return await newHardware.save();
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async editHardware(editHardwareDto) {
        try {
            const updatedHardware = { ...editHardwareDto };
            delete updatedHardware._id;
            const oldVersionHardware = await this.HardwareModel.findByIdAndUpdate(editHardwareDto._id);
            const updatedHardwareSave = await this.HardwareModel.findByIdAndUpdate(editHardwareDto._id, { ...updatedHardware }, { new: true });
            if (oldVersionHardware.title !== updatedHardwareSave.title) {
                await this.updateChannelsHardwareHostname(oldVersionHardware, updatedHardwareSave);
            }
            if (oldVersionHardware.uplink !== updatedHardwareSave.uplink) {
                await this.updateChannelHardwareLinks(oldVersionHardware, updatedHardwareSave);
            }
            return updatedHardwareSave;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateChannelsHardwareHostname(oldVersion, newVersion) {
        try {
            if (newVersion.hardware_type === "pe") {
                const findedChannelToUpdate = await this.ChannelModel.find({ channel_pe: oldVersion.title });
                findedChannelToUpdate.forEach(async (channel) => {
                    await this.ChannelModel.findByIdAndUpdate(channel._id, { channel_pe: newVersion.title });
                });
            }
            if (newVersion.hardware_type === "ssw" || newVersion.hardware_type === "stop") {
                const findedChannelToUpdate = await this.ChannelModel.find({ "channel_agg_stop.agg_stop": oldVersion.title });
                findedChannelToUpdate.forEach(async (channel) => {
                    const findedIndex = channel.channel_agg_stop.findIndex(agg_stop_obj => agg_stop_obj.agg_stop === oldVersion.title);
                    const updatedAggChannel = { ...channel.toJSON() };
                    updatedAggChannel.channel_agg_stop[findedIndex].agg_stop = newVersion.title;
                    await this.ChannelModel.findByIdAndUpdate(updatedAggChannel._id, { ...updatedAggChannel });
                });
            }
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateChannelHardwareLinks(oldVersion, newVersion) {
        try {
            if (newVersion.hardware_type === "ssw" || newVersion.hardware_type === "stop") {
                const findedChannelToUpdate = await this.ChannelModel.find({ "channel_agg_stop.agg_stop": newVersion.title });
                findedChannelToUpdate.forEach(async (channel) => {
                    const findedIndex = channel.channel_agg_stop.findIndex(agg_stop_obj => agg_stop_obj.agg_stop === newVersion.title);
                    const updatedAggChannel = { ...channel.toJSON() };
                    if (findedIndex === 0) {
                        updatedAggChannel.channel_pe_port = newVersion.uplink;
                    }
                    else {
                        updatedAggChannel.channel_agg_stop[findedIndex - 1].agg_port = newVersion.uplink;
                    }
                    await this.ChannelModel.findByIdAndUpdate(updatedAggChannel._id, { ...updatedAggChannel });
                });
            }
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.ChannelService = ChannelService;
exports.ChannelService = ChannelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(channel_schema_1.Channel.name)),
    __param(1, (0, mongoose_2.InjectModel)(hardware_schema_1.Hardware.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], ChannelService);
//# sourceMappingURL=channel.service.js.map