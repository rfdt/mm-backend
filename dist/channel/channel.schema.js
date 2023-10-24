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
exports.ChannelSchema = exports.Channel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/user.schema");
let Channel = class Channel {
};
exports.Channel = Channel;
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: "" }),
    __metadata("design:type", String)
], Channel.prototype, "id_tbcd", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: "" }),
    __metadata("design:type", String)
], Channel.prototype, "id_suz", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: "" }),
    __metadata("design:type", String)
], Channel.prototype, "id_oss", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: "" }),
    __metadata("design:type", String)
], Channel.prototype, "id_cms", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: "" }),
    __metadata("design:type", String)
], Channel.prototype, "client", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: "" }),
    __metadata("design:type", String)
], Channel.prototype, "service", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: "" }),
    __metadata("design:type", String)
], Channel.prototype, "service_size", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: "" }),
    __metadata("design:type", String)
], Channel.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: "" }),
    __metadata("design:type", String)
], Channel.prototype, "street", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: "" }),
    __metadata("design:type", String)
], Channel.prototype, "home", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: "" }),
    __metadata("design:type", String)
], Channel.prototype, "add_info", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: "" }),
    __metadata("design:type", String)
], Channel.prototype, "contact", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: "" }),
    __metadata("design:type", String)
], Channel.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now }),
    __metadata("design:type", Date)
], Channel.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: "" }),
    __metadata("design:type", String)
], Channel.prototype, "note", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: "" }),
    __metadata("design:type", String)
], Channel.prototype, "rd_sr", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "" }),
    __metadata("design:type", String)
], Channel.prototype, "channel_pe", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "" }),
    __metadata("design:type", String)
], Channel.prototype, "channel_pe_port", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "" }),
    __metadata("design:type", String)
], Channel.prototype, "channel_vid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ raw: (0, mongoose_1.raw)([{
                agg_stop: { type: String },
                agg_port: { type: String },
                withStop: { type: Boolean }
            }]) }),
    __metadata("design:type", Array)
], Channel.prototype, "channel_agg_stop", void 0);
__decorate([
    (0, mongoose_1.Prop)({ raw: (0, mongoose_1.raw)([{
                acc_stop: { type: String },
                acc_port: { type: String },
                acc_ip_mng: { type: String },
                acc_model: { type: String },
                acc_sn: { type: String },
                acc_mac: { type: String },
                withStop: { type: Boolean }
            }]) }),
    __metadata("design:type", Array)
], Channel.prototype, "channel_acc_stop", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: "" }),
    __metadata("design:type", String)
], Channel.prototype, "zabbix", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: "" }),
    __metadata("design:type", String)
], Channel.prototype, "zabbix_avail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: "crimea" }),
    __metadata("design:type", String)
], Channel.prototype, "channel_region", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Channel' }),
    __metadata("design:type", Channel)
], Channel.prototype, "channel_ref", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: true }),
    __metadata("design:type", Boolean)
], Channel.prototype, "channel_verified", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Channel.prototype, "channel_verified_user", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Channel.prototype, "channel_verified_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Channel.prototype, "inventory_channel_pe", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Channel.prototype, "inventory_channel_pe_port", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Channel.prototype, "inventory_channel_vid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Channel.prototype, "inventory_channel_agg_stop", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Channel.prototype, "inventory_channel_agg_port", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Channel.prototype, "inventory_channel_acc_stop", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Channel.prototype, "inventory_channel_ip_mng_acc", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Channel.prototype, "inventory_channel_acc_port", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Channel.prototype, "inventory_channel_acc_model", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Channel.prototype, "inventory_channel_acc_sn", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], Channel.prototype, "inventory_channel_acc_mac", void 0);
exports.Channel = Channel = __decorate([
    (0, mongoose_1.Schema)()
], Channel);
exports.ChannelSchema = mongoose_1.SchemaFactory.createForClass(Channel);
//# sourceMappingURL=channel.schema.js.map