/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document } from 'mongoose';
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
}
export declare const ChannelSchema: import("mongoose").Schema<Channel, import("mongoose").Model<Channel, any, any, any, Document<unknown, any, Channel> & Channel & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Channel, Document<unknown, {}, import("mongoose").FlatRecord<Channel>> & import("mongoose").FlatRecord<Channel> & {
    _id: import("mongoose").Types.ObjectId;
}>;
