import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { findChannelsDTO } from "./dto/findChannels.dto";
import { AuthGuard } from "../auth/auth.guard";
import {UpdatedChannelWithCreateDto} from "./dto/updatedChannelWithCreate.dto";
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
    return await this.ChannelService.findChannels(filters, 25);
  }

  @Post('/findall')
  async findAllChannelsWithFilter(@Body() filters: findChannelsDTO){
    return await this.ChannelService.findChannels(filters, 100000);
  }

  @Get('/find/:id')
  async findChannel(@Param() params){
    return await this.ChannelService.findChannelById(params.id);
  }

  // @UseGuards(AuthGuard)
  @Get('/getfiltersvalue')
  async gitFiltersValue(){
    return await this.ChannelService.gitFiltersValue();
  }

  @Get('/count')
  async getChannelsCount() {
    return await this.ChannelService.getChannelsCount();
  }

  @Get('/test')
  async testError(){
    return await this.ChannelService.testError();
  }

  @Post('/updateandcreate')
  async updateAndCreate(@Body() updatedChannelWithCreateDto: UpdatedChannelWithCreateDto){
    return await this.ChannelService.updateAndCreate(updatedChannelWithCreateDto);
  }

  @Post('/update')
  async updateChannel(@Body() updatedChannelDto: UpdatedChannelWithCreateDto){
    return await this.ChannelService.updateChannel(updatedChannelDto);
  }

  // @Get('/insert')
  //  async insertTestValues(){
  //   return  await this.ChannelService.insertTestValues();
  // }

}
