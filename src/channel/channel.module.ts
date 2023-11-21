import { Module } from '@nestjs/common';
import { ChannelController } from "./channel.controller";
import { ChannelService } from "./channel.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Channel, ChannelSchema } from "./channel.schema";
import { AuthModule } from "../auth/auth.module";
import { Hardware, HardwareSchema } from "./hardware.schema";
import {FilesModule} from "../files/files.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
    MongooseModule.forFeature([{ name: Hardware.name, schema: HardwareSchema }]),
      FilesModule,
    AuthModule
  ],
  controllers: [ChannelController],
  providers: [ChannelService],
})

export class ChannelModule {}
