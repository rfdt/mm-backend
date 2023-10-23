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
const auth_guard_1 = require("../auth/auth.guard");
const updatedChannelWithCreate_dto_1 = require("./dto/updatedChannelWithCreate.dto");
const newChannel_dto_1 = require("./dto/newChannel.dto");
const createHardware_1 = require("./dto/createHardware");
const userId_decorator_1 = require("../auth/userId.decorator");
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
    async testError() {
        return await this.ChannelService.testError();
    }
    async updateAndCreate(updatedChannelWithCreateDto) {
        return await this.ChannelService.updateAndCreate(updatedChannelWithCreateDto);
    }
    async updateChannel(updatedChannelDto) {
        return await this.ChannelService.updateChannel(updatedChannelDto);
    }
    async createChannel(newChannelDto) {
        return await this.ChannelService.createChannel(newChannelDto);
    }
    async verifyChannel(verifiedChannelDto, userID) {
        return await this.ChannelService.verifyChannel(verifiedChannelDto, userID);
    }
    async getRelatedChannels(params) {
        return await this.ChannelService.getRelatedChannels(params.id);
    }
    async createHardware(createHardwareDto) {
        return await this.ChannelService.createHardware(createHardwareDto);
    }
    async editHardware(editHardwareDto) {
        return this.ChannelService.editHardware(editHardwareDto);
    }
    async backupWithFtp() {
        return await this.ChannelService.backupWithFtp();
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
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
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
__decorate([
    (0, common_1.Get)('/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "testError", null);
__decorate([
    (0, common_1.Post)('/updateandcreate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updatedChannelWithCreate_dto_1.UpdatedChannelWithCreateDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "updateAndCreate", null);
__decorate([
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updatedChannelWithCreate_dto_1.UpdatedChannelWithCreateDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "updateChannel", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [newChannel_dto_1.newChannelDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "createChannel", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('/verify'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, userId_decorator_1.UserID)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updatedChannelWithCreate_dto_1.UpdatedChannelWithCreateDto, String]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "verifyChannel", null);
__decorate([
    (0, common_1.Get)('/related/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getRelatedChannels", null);
__decorate([
    (0, common_1.Post)('/create/hardware'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createHardware_1.CreateHardwareDTO]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "createHardware", null);
__decorate([
    (0, common_1.Post)('/edit/hardware'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createHardware_1.CreateHardwareDTO]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "editHardware", null);
__decorate([
    (0, common_1.Get)('/backup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "backupWithFtp", null);
exports.ChannelController = ChannelController = __decorate([
    (0, common_1.Controller)('channels'),
    __metadata("design:paramtypes", [channel_service_1.ChannelService])
], ChannelController);
//# sourceMappingURL=channel.controller.js.map