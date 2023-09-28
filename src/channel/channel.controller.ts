import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { findChannelsDTO } from "./dto/findChannels.dto";
@Controller('channels')
export class ChannelController {

  constructor(private readonly ChannelService: ChannelService) {
  }

  @Get('/')
  async findAllChannels() {
    return await this.ChannelService.findAllChannels();
  }

  @Post('/find')
  async findChannels(@Body() filters: findChannelsDTO){
    return await this.ChannelService.findChannels(filters);
  }

  @Get('/find/:id')
  async findChannel(@Param() params){
    return await this.ChannelService.findChannelById(params.id);
  }

  @Get('/getfiltersvalue')
  async gitFiltersValue(){
    return await this.ChannelService.gitFiltersValue();
  }

  @Get('/count')
  async getChannelsCount() {
    return await this.ChannelService.getChannelsCount();
  }

  // @Get('/insert')
  //  async insertTestValues(){
  //   return  await this.ChannelService.insertTestValues();
  // }

}