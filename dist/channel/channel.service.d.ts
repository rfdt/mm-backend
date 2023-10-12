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
import { Model } from "mongoose";
import { Channel, ChannelDocument } from "./channel.schema";
import { findChannelsDTO } from "./dto/findChannels.dto";
import { UpdatedChannelWithCreateDto } from "./dto/updatedChannelWithCreate.dto";
import { newChannelDto } from "./dto/newChannel.dto";
export declare class ChannelService {
    private ChannelModel;
    constructor(ChannelModel: Model<ChannelDocument>);
    findAllChannels(): Promise<(import("mongoose").Document<unknown, {}, ChannelDocument> & Channel & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findChannelById(channel_id: string): Promise<import("mongoose").Document<unknown, {}, ChannelDocument> & Channel & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findChannels(filters: findChannelsDTO, limit: number): Promise<{
        channels: (import("mongoose").Document<unknown, {}, ChannelDocument> & Channel & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        count: number;
    }>;
    gitFiltersValue(): Promise<{
        city: any[];
        streets: {};
        services: any[];
        clients: any[];
        agg: any[];
        acc: any[];
        pe: any[];
    }>;
    getChannelsCount(): Promise<number>;
    testError(): Promise<void>;
    updateAndCreate(updatedChannelWithCreateDto: UpdatedChannelWithCreateDto): Promise<import("mongoose").Document<unknown, {}, ChannelDocument> & Channel & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateChannel(updateChannelDto: UpdatedChannelWithCreateDto): Promise<import("mongoose").Document<unknown, {}, ChannelDocument> & Channel & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createChannel(newChannel: newChannelDto): Promise<import("mongoose").Document<unknown, {}, ChannelDocument> & Channel & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
