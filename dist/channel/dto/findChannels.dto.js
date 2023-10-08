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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findChannelsDTO = void 0;
const class_validator_1 = require("class-validator");
class findChannelsDTO {
}
exports.findChannelsDTO = findChannelsDTO;
__decorate([
    (0, class_validator_1.IsString)({ message: "Пожалуйста ввведите корректный фильтр - addInfoFilter" }),
    __metadata("design:type", String)
], findChannelsDTO.prototype, "addInfoFilter", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Пожалуйста ввведите корректный фильтр - cityFilter" }),
    __metadata("design:type", String)
], findChannelsDTO.prototype, "cityFilter", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Пожалуйста ввведите корректный фильтр - streetFilter" }),
    __metadata("design:type", String)
], findChannelsDTO.prototype, "streetFilter", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Пожалуйста ввведите корректный фильтр - homeFilter" }),
    __metadata("design:type", String)
], findChannelsDTO.prototype, "homeFilter", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Пожалуйста ввведите корректный фильтр - serviceFilter" }),
    __metadata("design:type", String)
], findChannelsDTO.prototype, "serviceFilter", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Пожалуйста ввведите корректный фильтр - statusFilter" }),
    __metadata("design:type", String)
], findChannelsDTO.prototype, "statusFilter", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Пожалуйста ввведите корректный фильтр - peFilter" }),
    __metadata("design:type", String)
], findChannelsDTO.prototype, "peFilter", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Пожалуйста ввведите корректный фильтр - rdFilter" }),
    __metadata("design:type", String)
], findChannelsDTO.prototype, "rdFilter", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Пожалуйста ввведите корректный фильтр - channelAggStopFilter" }),
    __metadata("design:type", String)
], findChannelsDTO.prototype, "channelAggStopFilter", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Пожалуйста ввведите корректный фильтр - vidFilter" }),
    __metadata("design:type", String)
], findChannelsDTO.prototype, "vidFilter", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Пожалуйста ввведите корректный фильтр - sizeFilter" }),
    __metadata("design:type", String)
], findChannelsDTO.prototype, "sizeFilter", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Пожалуйста ввведите корректный фильтр - channelAccStopFilter" }),
    __metadata("design:type", String)
], findChannelsDTO.prototype, "channelAccStopFilter", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Пожалуйста ввведите корректный фильтр - channelIpMngFilter" }),
    __metadata("design:type", String)
], findChannelsDTO.prototype, "channelIpMngFilter", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Пожалуйста ввведите корректный фильтр - channelRegionFilter" }),
    __metadata("design:type", String)
], findChannelsDTO.prototype, "channelRegionFilter", void 0);
//# sourceMappingURL=findChannels.dto.js.map