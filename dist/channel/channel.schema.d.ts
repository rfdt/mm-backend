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
    date: Date;
    note: string;
    rd_sr: string;
    channel_pe: string;
    channel_pe_port: string;
    channel_vid: string;
    channel_agg_stop: [Record<string, any>];
    channel_acc_stop: [Record<string, any>];
    zabbix: string;
    zabbix_avail: string;
    channel_region: string;
    channel_ref: Channel;
    channel_verified: boolean;
    inventory_channel_pe: string;
    inventory_channel_pe_port: string;
    inventory_channel_vid: string;
    inventory_channel_agg_stop: string;
    inventory_channel_agg_port: string;
    inventory_channel_acc_stop: string;
    inventory_channel_ip_mng_acc: string;
    inventory_channel_acc_port: string;
    inventory_channel_acc_model: string;
    inventory_channel_acc_sn: string;
    inventory_channel_acc_mac: string;
}
export declare const ChannelSchema: mongoose.Schema<Channel, mongoose.Model<Channel, any, any, any, mongoose.Document<unknown, any, Channel> & Channel & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Channel, mongoose.Document<unknown, {}, mongoose.FlatRecord<Channel>> & mongoose.FlatRecord<Channel> & {
    _id: mongoose.Types.ObjectId;
}>;
