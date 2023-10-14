import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';
export type ChannelDocument = Channel & Document;
@Schema()
export class Channel {

  @Prop({required: true, default: ""})
  id_tbcd: string;

  @Prop({required: true, default: ""})
  id_suz: string;

  @Prop({required: true, default: ""})
  id_oss: string;

  @Prop({required: true, default: ""})
  id_cms: string;




  @Prop({required: true, default: ""})
  client: string;

  @Prop({required: true, default: ""})
  service: string;

  @Prop({required: true, default: ""})
  service_size: string;

  @Prop({required: true, default: ""})
  city: string;

  @Prop({required: true, default: ""})
  street: string;

  @Prop({required: true, default: ""})
  home: string;




  @Prop({required: true, default: ""})
  add_info: string;

  @Prop({required: true, default: ""})
  contact: string;

  @Prop({required: true, default: ""})
  status: string;

  @Prop({required: true, default: Date.now})
  date: Date;

  @Prop({required: true, default: ""})
  note: string;

  @Prop({required: true, default: ""})
  rd_sr: string;




  @Prop({ default: ""})
  channel_pe: string;

  @Prop({ default: ""})
  channel_pe_port: string;

  @Prop({ default: ""})
  channel_vid: string;




  @Prop({raw: raw([{
      agg_stop: {type: String},
      agg_port: {type: String},
      withStop: {type: Boolean}
    }])})
  channel_agg_stop: [Record<string, any>];

  @Prop({raw: raw([{
      acc_stop: {type: String},
      acc_port  : {type: String},
      acc_ip_mng: {type: String},
      acc_model: {type: String},
      acc_sn: {type: String},
      acc_mac: {type: String},
      withStop: {type: Boolean}
    }])})
  channel_acc_stop: [Record<string, any>];

  @Prop({required: true, default: ""})
  zabbix: string;

  @Prop({required: true, default: ""})
  zabbix_avail: string;

  @Prop({required: true, default: "crimea"})
  channel_region: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' })
  channel_ref: Channel;

  @Prop({required: true, default: true})
  channel_verified: boolean;




  /* BackDoor for inventory*/

  @Prop({ default: null})
  inventory_channel_pe: string;

  @Prop({ default: null})
  inventory_channel_pe_port: string;

  @Prop({ default: null})
  inventory_channel_vid: string;

  @Prop({ default: null})
  inventory_channel_agg_stop: string;

  @Prop({ default: null})
  inventory_channel_agg_port: string;

  @Prop({ default: null})
  inventory_channel_acc_stop: string;

  @Prop({ default: null})
  inventory_channel_ip_mng_acc: string;

  @Prop({ default: null})
  inventory_channel_acc_port: string;

  @Prop({ default: null})
  inventory_channel_acc_model: string;

  @Prop({ default: null})
  inventory_channel_acc_sn: string;

  @Prop({ default: null})
  inventory_channel_acc_mac: string;

}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
