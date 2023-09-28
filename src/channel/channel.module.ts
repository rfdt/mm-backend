import { Module } from '@nestjs/common';
import { ChannelController } from "./channel.controller";
import { ChannelService } from "./channel.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Channel, ChannelSchema } from "./channel.schema";


@Module({
  imports: [MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }])],
  controllers: [ChannelController],
  providers: [ChannelService],
})

export class ChannelModule {}
