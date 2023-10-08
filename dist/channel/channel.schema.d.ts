import mongoose, { Document } from 'mongoose';
export type ChannelDocument = Channel & Document;
export declare class Channel {
    id_tbcd: string;
    id_suz: string;
    id_oss: string;
    id_cms: string;
    client: string;
    service: string;
    service_size: string;
    city: string;
    street: string;
    home: string;
    add_info: string;
    contact: string;
    status: string;
    date: string;
    note: string;
    rd_sr: string;
    channel_pe: string;
    channel_pe_port: string;
    channel_vid: string;
    channel_agg_stop: string;
    channel_agg_port: string;
    channel_acc_stop: string;
    channel_ip_mng_acc: string;
    channel_acc_port: string;
    channel_acc_model: string;
    channel_acc_sn: string;
    channel_acc_mac: string;
    zabbix: string;
    zabbix_avail: string;
    channel_region: string;
    channel_ref: Channel;
}
export declare const ChannelSchema: mongoose.Schema<Channel, mongoose.Model<Channel, any, any, any, mongoose.Document<unknown, any, Channel> & Channel & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Channel, mongoose.Document<unknown, {}, mongoose.FlatRecord<Channel>> & mongoose.FlatRecord<Channel> & {
    _id: mongoose.Types.ObjectId;
}>;
