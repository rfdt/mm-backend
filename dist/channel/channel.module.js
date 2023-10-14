"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelModule = void 0;
const common_1 = require("@nestjs/common");
const channel_controller_1 = require("./channel.controller");
const channel_service_1 = require("./channel.service");
const mongoose_1 = require("@nestjs/mongoose");
const channel_schema_1 = require("./channel.schema");
const auth_module_1 = require("../auth/auth.module");
const hardware_schema_1 = require("./hardware.schema");
let ChannelModule = class ChannelModule {
};
exports.ChannelModule = ChannelModule;
exports.ChannelModule = ChannelModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: channel_schema_1.Channel.name, schema: channel_schema_1.ChannelSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: hardware_schema_1.Hardware.name, schema: hardware_schema_1.HardwareSchema }]),
            auth_module_1.AuthModule
        ],
        controllers: [channel_controller_1.ChannelController],
        providers: [channel_service_1.ChannelService],
    })
], ChannelModule);
//# sourceMappingURL=channel.module.js.map