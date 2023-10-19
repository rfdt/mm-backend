import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';
import { Channel } from "./channel.schema";

export type HardwareDocument = Hardware & Document;
@Schema()
export class Hardware {
  @Prop({required: true, default: "", unique: true})
  title: string;

  @Prop({required: true, default: ""})
  uplink: string;

  @Prop({required: true, default: ""})
  uplink_type: string;

  @Prop({required: true, default: ""})
  hardware_type: string;
}

export const HardwareSchema = SchemaFactory.createForClass(Hardware);
