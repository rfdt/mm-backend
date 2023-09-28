import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Error, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Channel, ChannelDocument } from "./channel.schema";
import { findChannelsDTO } from "./dto/findChannels.dto";


@Injectable()
export class ChannelService {

  constructor(@InjectModel(Channel.name) private ChannelModel: Model<ChannelDocument>) {
  }

  async findAllChannels(){
    try {
      return await this.ChannelModel.find({});
    }catch (e){
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findChannelById(channel_id: string){
    try {
      const channel = await this.ChannelModel.findOne({_id: channel_id});
      return channel;
    }catch (e){
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findChannels(filters: findChannelsDTO){
    try {
      const channels = await this.ChannelModel.find({
        $and: [
          {city: {$regex: filters.cityFilter, $options: 'i'}},
          {street: {$regex: filters.streetFilter, $options: 'i'}},
          {home: {$regex: filters.homeFilter, $options: 'i'}},
          {service: {$regex: filters.serviceFilter, $options: 'i'}},
          {status: {$regex: filters.statusFilter, $options: 'i'}},
          {$or: [
              {id_tbcd: {$regex: filters.addInfoFilter, $options: 'i'}},
              {id_suz: {$regex: filters.addInfoFilter, $options: 'i'}},
              {id_cms: {$regex: filters.addInfoFilter, $options: 'i'}},
              {client: {$regex: filters.addInfoFilter, $options: 'i'}},
              {add_info: {$regex: filters.addInfoFilter, $options: 'i'}},
              {note: {$regex: filters.addInfoFilter, $options: 'i'}},
            ]},
          {channel_pe: {$regex: filters.peFilter, $options: 'i'}},
          {rd_sr: {$regex: filters.rdFilter, $options: 'i'}},
          {channel_agg_stop: {$regex: filters.channelAggStopFilter, $options: 'i'}},
          {channel_vid:  {$regex: filters.vidFilter, $options: 'i'}},
          {service_size: {$regex: filters.sizeFilter, $options: 'i'}},
          {channel_acc_stop: {$regex: filters.channelAccStopFilter, $options: 'i'}},
          {channel_ip_mng_acc: {$regex: filters.channelIpMngFilter, $options: 'i'}}
        ]
      }, null, {sort: {'_id': -1}}).limit(25)
      return channels;
    }catch (e){
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  async gitFiltersValue(){
    try {
      const channels = await this.findAllChannels();
      const city = [];
      const streets = {};
      const services = [];
      const clients = [];
      const pe = [];
      const agg = [];
      const acc = [];

      channels.forEach(channel=>{
        city.indexOf(channel.city) === -1 ? city.push(channel.city) : null;
        if(streets.hasOwnProperty(channel.city)){
          if(streets[channel.city].indexOf(channel.street) === -1){
            streets[channel.city].push(channel.street)
          }
        }else {
          streets[channel.city] = []
          streets[channel.city].push(channel.street)
        }
        services.indexOf(channel.service) === -1 ? services.push(channel.service) : null;
        clients.indexOf(channel.client) === -1 ? clients.push(channel.client) : null;
        pe.indexOf(channel.channel_pe) === -1 ? pe.push(channel.channel_pe) : null;
        agg.indexOf(channel.channel_agg_stop) === -1 ? agg.push(channel.channel_agg_stop) : null;
        acc.indexOf(channel.channel_acc_stop) === -1 ? acc.push(channel.channel_acc_stop) : null;
      })

      return ({city, streets, services, clients, agg, acc, pe})
    }catch (e){
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }

  }

  async getChannelsCount(){
    try {
      return await this.ChannelModel.find({}).count();
    }catch (e){
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  // async insertTestValues(){
  //   try {
  //     this.channels.forEach(async (channel, idx)=>{
  //       try {
  //         await this.ChannelModel.create({
  //           ...channel,
  //           contact: channel.contact ? channel.contact : "XXX",
  //           note: channel.note ? channel.note : "XXX",
  //           channel_agg_stop: channel.channel_agg_stop ? channel.channel_agg_stop : "XXX",
  //           channel_agg_port: channel.channel_agg_port ? channel.channel_agg_port : "XXXX",
  //           add_info: channel.add_info ? channel.add_info : "XXX",
  //           channel_vid: channel.channel_vid ?  channel.channel_vid : "XXX",
  //           id_cms: channel.id_cms ? channel.id_cms : "XXX",
  //           zabbix_avail: channel.zabbix_avail ? channel.zabbix_avail : "XXX",
  //           id_oss: channel.id_oss ? channel.id_oss : "XXX",
  //           rd_sr: channel.rd_sr ? channel.rd_sr : "XXX"
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

}