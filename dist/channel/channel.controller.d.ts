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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ChannelService } from "./channel.service";
import { findChannelsDTO } from "./dto/findChannels.dto";
import { UpdatedChannelWithCreateDto } from "./dto/updatedChannelWithCreate.dto";
import { newChannelDto } from "./dto/newChannel.dto";
import { CreateHardwareDTO } from "./dto/createHardware";
export declare class ChannelController {
    private readonly ChannelService;
    constructor(ChannelService: ChannelService);
    findAllChannels(): Promise<(import("mongoose").Document<unknown, {}, import("./channel.schema").ChannelDocument> & import("./channel.schema").Channel & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findChannels(filters: findChannelsDTO): Promise<{
        channels: (import("mongoose").Document<unknown, {}, import("./channel.schema").ChannelDocument> & import("./channel.schema").Channel & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        count: number;
    }>;
    findAllChannelsWithFilter(filters: findChannelsDTO): Promise<{
        channels: (import("mongoose").Document<unknown, {}, import("./channel.schema").ChannelDocument> & import("./channel.schema").Channel & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        count: number;
    }>;
    findChannel(params: any): Promise<import("mongoose").Document<unknown, {}, import("./channel.schema").ChannelDocument> & import("./channel.schema").Channel & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    gitFiltersValue(): Promise<{
        city: any[];
        streets: {};
        services: any[];
        clients: any[];
        pe: (import("mongoose").Document<unknown, {}, import("./hardware.schema").HardwareDocument> & import("./hardware.schema").Hardware & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        ssw: (import("mongoose").Document<unknown, {}, import("./hardware.schema").HardwareDocument> & import("./hardware.schema").Hardware & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        stop: (import("mongoose").Document<unknown, {}, import("./hardware.schema").HardwareDocument> & import("./hardware.schema").Hardware & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getChannelsCount(): Promise<number>;
    testError(): Promise<void>;
    updateAndCreate(updatedChannelWithCreateDto: UpdatedChannelWithCreateDto): Promise<import("mongoose").Document<unknown, {}, import("./channel.schema").ChannelDocument> & import("./channel.schema").Channel & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateChannel(updatedChannelDto: UpdatedChannelWithCreateDto): Promise<import("mongoose").Document<unknown, {}, import("./channel.schema").ChannelDocument> & import("./channel.schema").Channel & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createChannel(newChannelDto: newChannelDto): Promise<import("mongoose").Document<unknown, {}, import("./channel.schema").ChannelDocument> & import("./channel.schema").Channel & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createHardware(createHardwareDto: CreateHardwareDTO): Promise<import("mongoose").Document<unknown, {}, import("./hardware.schema").HardwareDocument> & import("./hardware.schema").Hardware & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    editHardware(editHardwareDto: CreateHardwareDTO): Promise<import("mongoose").Document<unknown, {}, import("./hardware.schema").HardwareDocument> & import("./hardware.schema").Hardware & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    backupWithFtp(): Promise<{
        message: string;
    }>;
}
