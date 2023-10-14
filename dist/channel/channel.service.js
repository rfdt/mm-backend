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
const channel_schema_1 = require("./channel.schema");
const hardware_schema_1 = require("./hardware.schema");
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
            const channel = await this.ChannelModel.findOne({ _id: channel_id });
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
                    { city: { $regex: filters.cityFilter, $options: 'i' } },
                    { street: { $regex: filters.streetFilter, $options: 'i' } },
                    { home: { $regex: filters.homeFilter, $options: 'i' } },
                    { service: { $regex: filters.serviceFilter, $options: 'i' } },
                    { status: filters.statusFilter ? { $regex: filters.statusFilter, $options: 'i' } : { $in: ["ВКЛ", "ПАУЗА", "РЕЗЕРВ", "ОТКЛ"] } },
                    { $or: [
                            { id_tbcd: { $regex: filters.addInfoFilter, $options: 'i' } },
                            { id_suz: { $regex: filters.addInfoFilter, $options: 'i' } },
                            { id_cms: { $regex: filters.addInfoFilter, $options: 'i' } },
                            { id_oss: { $regex: filters.addInfoFilter, $options: 'i' } },
                            { client: { $regex: filters.addInfoFilter, $options: 'i' } },
                            { add_info: { $regex: filters.addInfoFilter, $options: 'i' } },
                            { note: { $regex: filters.addInfoFilter, $options: 'i' } },
                        ] },
                ]
            };
            const data = await Promise.all([
                this.ChannelModel.find(query, null, { sort: { '_id': -1 } }).count(),
                await this.ChannelModel.find(query, null, { sort: { '_id': -1 } }).limit(limit)
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
            return ({ city, streets, services, clients,
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
        throw new common_1.HttpException('Тестовая ошибка', common_1.HttpStatus.BAD_REQUEST);
    }
    async updateAndCreate(updatedChannelWithCreateDto) {
        try {
            const changedStatusField = await this.ChannelModel.findByIdAndUpdate(updatedChannelWithCreateDto._id, { status: "ИЗМ" }, { new: true });
            const newChannel = new this.ChannelModel({
                ...updatedChannelWithCreateDto,
                channel_ref: updatedChannelWithCreateDto.channel_ref ? updatedChannelWithCreateDto.channel_ref : updatedChannelWithCreateDto._id,
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
    async getHardwareValues() {
        return await Promise.all([
            await this.HardwareModel.find({ hardware_type: 'pe' }),
            await this.HardwareModel.find({ hardware_type: 'ssw' }),
            await this.HardwareModel.find({ hardware_type: 'stop' }),
        ]);
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