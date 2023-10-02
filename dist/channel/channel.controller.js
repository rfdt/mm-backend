"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelController = void 0;
const common_1 = require("@nestjs/common");
const channel_service_1 = require("./channel.service");
const findChannels_dto_1 = require("./dto/findChannels.dto");
let ChannelController = class ChannelController {
    constructor(ChannelService) {
        this.ChannelService = ChannelService;
    }
    async findAllChannels() {
        return await this.ChannelService.findAllChannels();
    }
    async findChannels(filters) {
        return await this.ChannelService.findChannels(filters, 25);
    }
    async findAllChannelsWithFilter(filters) {
        return await this.ChannelService.findChannels(filters, 100000);
    }
    async findChannel(params) {
        return await this.ChannelService.findChannelById(params.id);
    }
    async gitFiltersValue() {
        return await this.ChannelService.gitFiltersValue();
    }
    async getChannelsCount() {
        return await this.ChannelService.getChannelsCount();
    }
};
exports.ChannelController = ChannelController;
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "findAllChannels", null);
__decorate([
    (0, common_1.Post)('/find'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findChannels_dto_1.findChannelsDTO]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "findChannels", null);
__decorate([
    (0, common_1.Post)('/findall'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findChannels_dto_1.findChannelsDTO]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "findAllChannelsWithFilter", null);
__decorate([
    (0, common_1.Get)('/find/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "findChannel", null);
__decorate([
    (0, common_1.Get)('/getfiltersvalue'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "gitFiltersValue", null);
__decorate([
    (0, common_1.Get)('/count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getChannelsCount", null);
exports.ChannelController = ChannelController = __decorate([
    (0, common_1.Controller)('channels'),
    __metadata("design:paramtypes", [channel_service_1.ChannelService])
], ChannelController);
//# sourceMappingURL=channel.controller.js.map