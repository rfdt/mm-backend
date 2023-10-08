import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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

  @Prop({required: true, default: ""})
  date: string;

  @Prop({required: true, default: ""})
  note: string;

  @Prop({required: true, default: ""})
  rd_sr: string;

  @Prop({required: true, default: ""})
  channel_pe: string;

  @Prop({required: true, default: ""})
  channel_pe_port: string;

  @Prop({required: true, default: ""})
  channel_vid: string;

  @Prop({required: true, default: ""})
  channel_agg_stop: string;

  @Prop({required: true, default: ""})
  channel_agg_port: string;

  @Prop({required: true, default: ""})
  channel_acc_stop: string;

  @Prop({required: true, default: ""})
  channel_ip_mng_acc: string;

  @Prop({required: true, default: ""})
  channel_acc_port: string;

  @Prop({required: true, default: ""})
  channel_acc_model: string;

  @Prop({required: true, default: ""})
  channel_acc_sn: string;

  @Prop({required: true, default: ""})
  channel_acc_mac: string;

  @Prop({required: true, default: ""})
  zabbix: string;

  @Prop({required: true, default: ""})
  zabbix_avail: string;

  @Prop({required: true, default: "crimea"})
  channel_region: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' })
  channel_ref: Channel;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
