import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Error, Model, Schema } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Readable } from "stream";
import { Channel, ChannelDocument } from "./channel.schema";
import { findChannelsDTO } from "./dto/findChannels.dto";
import { UpdatedChannelWithCreateDto } from "./dto/updatedChannelWithCreate.dto";
import { newChannelDto } from "./dto/newChannel.dto";
import { Hardware, HardwareDocument } from "./hardware.schema";
import * as xlsx from "xlsx";
import * as ftp from "basic-ftp";
// import * as backup from "../tw.json";
import { transformToBase } from "./utils/transformToBase";
import { CreateHardwareDTO } from "./dto/createHardware";


@Injectable()
export class ChannelService {

  constructor(@InjectModel(Channel.name) private ChannelModel: Model<ChannelDocument>,
              @InjectModel(Hardware.name) private HardwareModel: Model<HardwareDocument>) {
  }

  async findAllChannels() {
    try {
      return await this.ChannelModel.find({});
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findChannelById(channel_id: string) {
    try {
      const channel = await this.ChannelModel.findOne({ _id: channel_id });
      return channel;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findChannels(filters: findChannelsDTO, limit: number) {
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
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
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
        } else {
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
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }

  }

  async getChannelsCount() {
    try {
      return await this.ChannelModel.find({}).count();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async testError() {
    throw new HttpException("Тестовая ошибка", HttpStatus.BAD_REQUEST);
  }

  async updateAndCreate(updatedChannelWithCreateDto: UpdatedChannelWithCreateDto) {
    try {
      const changedStatusField = await this.ChannelModel.findByIdAndUpdate(updatedChannelWithCreateDto._id,
        { status: "ИЗМ" }, { new: true });
      const newChannel = new this.ChannelModel({
        ...updatedChannelWithCreateDto,
        channel_ref: updatedChannelWithCreateDto.channel_ref ? updatedChannelWithCreateDto.channel_ref : updatedChannelWithCreateDto._id,
        _id: null
      });
      const newUpdatedChannel = await newChannel.save();
      return newUpdatedChannel;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateChannel(updateChannelDto: UpdatedChannelWithCreateDto) {
    try {
      const newChannel = { ...updateChannelDto };
      delete newChannel._id;
      const changedChannel = await this.ChannelModel.findByIdAndUpdate(updateChannelDto._id,
        { ...newChannel }, { new: true });
      return changedChannel;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createChannel(newChannel: newChannelDto) {
    try {
      const newChannelDocument = new this.ChannelModel({ ...newChannel });
      return await newChannelDocument.save();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
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
      const transformed = channels ? transformToBase(channels) : [];
      const worksheet = xlsx.utils.json_to_sheet(transformed);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, { type: "buffer" });
      const excel_stream = Readable.from(excelBuffer);
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
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createHardware(createHardwareDto: CreateHardwareDTO) {
    try {
      const newHardware = new this.HardwareModel({
        ...createHardwareDto
      });
      return await newHardware.save();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async editHardware(editHardwareDto: CreateHardwareDTO) {
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
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
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
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateChannelHardwareLinks(oldVersion, newVersion) {
    try {
      if (newVersion.hardware_type === "ssw" || newVersion.hardware_type === "stop") {
        const findedChannelToUpdate = await this.ChannelModel.find({ "channel_agg_stop.agg_stop": newVersion.title });
        findedChannelToUpdate.forEach(async (channel) => {
          const findedIndex = channel.channel_agg_stop.findIndex(agg_stop_obj => agg_stop_obj.agg_stop === newVersion.title);
          const updatedAggChannel = { ...channel.toJSON() };
          if(findedIndex === 0){
              updatedAggChannel.channel_pe_port = newVersion.uplink;
          }else{
              updatedAggChannel.channel_agg_stop[findedIndex - 1].agg_port = newVersion.uplink;
          }
          await this.ChannelModel.findByIdAndUpdate(updatedAggChannel._id, { ...updatedAggChannel });
        });
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  // channels = backup;
  // async insertTestValues(){
  //   try {
  //     backup.forEach(async (channel, idx)=>{
  //       delete channel._id
  //       const parsedDate = new Date(channel.date.split('.').reverse().join('.')).toString()
  //       if(idx === 0) {
  //         console.log(parsedDate)
  //       }
  //       try {
  //         await this.ChannelModel.create({
  //           ...channel,
  //           channel_verified: false,
  //           channel_agg_stop: null,
  //           channel_acc_stop: null,
  //           channel_pe: null,
  //           channel_pe_port: null,
  //           channel_vid: null,
  //           date: parsedDate,
  //
  //           inventory_channel_pe: channel.channel_pe,
  //           inventory_channel_pe_port: channel.channel_pe_port,
  //           inventory_channel_vid: channel.channel_vid,
  //           inventory_channel_agg_stop: channel.channel_agg_stop,
  //           inventory_channel_agg_port: channel.channel_agg_port,
  //           inventory_channel_acc_stop: channel.channel_acc_stop,
  //           inventory_channel_ip_mng_acc: channel.channel_ip_mng_acc,
  //           inventory_channel_acc_port: channel.channel_acc_port,
  //           inventory_channel_acc_model: channel.channel_acc_model,
  //           inventory_channel_acc_sn: channel.channel_acc_sn,
  //           inventory_channel_acc_mac: channel.channel_acc_mac
  //         })
  //       } catch (e){
  //         console.log(e.message, "    ", idx);
  //       }
  //     })
  //     return 'Imported. Try to check'
  //   }catch (e){
  //     throw new HttpException({e: e.message}, HttpStatus.BAD_REQUEST)
  //   }
  // }

  // async insertTestHarwaresValues(){
  //   const channels = await this.findAllChannels();
  //   const pe = [];
  //   const peStop = [];
  //   const agg = [];
  //   const aggStop = [];
  //
  //   channels.forEach(async (channel)=>{
  //     if (pe.indexOf(channel.inventory_channel_pe) === -1 ) {
  //       pe.push(channel.inventory_channel_pe)
  //       await this.HardwareModel.create({
  //         title: channel.inventory_channel_pe ? channel.inventory_channel_pe : "SOME_BAD_IMPORTED_AR",
  //         uplink: 'xe-1/0/1',
  //         uplink_type: 'to_core',
  //         hardware_type: 'pe'
  //       })
  //     }
  //
  //     if(agg.indexOf(channel.inventory_channel_agg_stop) === -1 && aggStop.indexOf(channel.inventory_channel_agg_stop) === -1){
  //       if(channel.inventory_channel_agg_stop && channel.inventory_channel_agg_stop.split('-')[0].length === 4 && channel.inventory_channel_agg_stop.split('-')[1] && channel.inventory_channel_agg_stop.toLowerCase() !== 'apex-krym'){
  //         agg.push(channel.inventory_channel_agg_stop)
  //         await this.HardwareModel.create({
  //           title: channel.inventory_channel_agg_stop ? channel.inventory_channel_agg_stop : "SOME_BAD_IMPORTED_SSW",
  //           uplink: 'ge-1/0/1',
  //           uplink_type: 'to_ar',
  //           hardware_type: 'ssw'
  //         })
  //       }else {
  //         aggStop.push(channel.inventory_channel_agg_stop)
  //         await this.HardwareModel.create({
  //           title: channel.inventory_channel_agg_stop ? channel.inventory_channel_agg_stop : "SOME_BODE_IMPORTED_STOP",
  //           uplink: 'ge-1/0/2',
  //           uplink_type: 'to_ar',
  //           hardware_type: 'stop'
  //         })
  //       }
  //     }
  //   })
  //
  //   return('Try to check')
  // }

}
