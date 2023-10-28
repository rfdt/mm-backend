import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;
@Schema()
export class User {

  @Prop({required: true, default: "", unique: true})
  name: string

  @Prop({required: true, default: "", unique: true})
  login: string;

  @Prop({required: true, default: ""})
  password_hash: string

  @Prop({required: true, default: []})
  roles: string[]
}

export const UserSchema = SchemaFactory.createForClass(User);
