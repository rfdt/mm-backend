import {Body, Controller, Get, Param, Post, Query, UploadedFiles, UseGuards, UseInterceptors} from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { findChannelsDTO } from "./dto/findChannels.dto";
import { AuthGuard } from "../auth/auth.guard";
import {UpdatedChannelWithCreateDto} from "./dto/updatedChannelWithCreate.dto";
import {newChannelDto} from "./dto/newChannel.dto";
import {CreateHardwareDTO} from "./dto/createHardware";
import {UserID} from "../auth/userId.decorator";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
@Controller('channels')
export class ChannelController {

  constructor(private readonly ChannelService: ChannelService) {
  }

  @Get('/')
  async findAllChannels() {
    return await this.ChannelService.findAllChannels();
  }

  @UseGuards(AuthGuard)
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

  @Post('/create')
  async createChannel(@Body() newChannelDto: newChannelDto){
    return await this.ChannelService.createChannel(newChannelDto);
  }

  @UseInterceptors(FileFieldsInterceptor([
    {name: "file", maxCount: 1}
  ]))
  @Post('/createfromfile')
  async createFromFile(@UploadedFiles() files){
    return await this.ChannelService.createFromFile(files.file[0]);
  }

  @UseGuards(AuthGuard)
  @Post('/verify')
  async verifyChannel(@Body() verifiedChannelDto: UpdatedChannelWithCreateDto, @UserID() userID: string){
    return await this.ChannelService.verifyChannel(verifiedChannelDto, userID);
  }

  @Get('/related/:id')
  async getRelatedChannels(@Param() params){
    return await this.ChannelService.getRelatedChannels(params.id);
  }

  @Post('/create/hardware')
  async createHardware(@Body()createHardwareDto: CreateHardwareDTO){
    return await this.ChannelService.createHardware(createHardwareDto);
  }

  @Post('/edit/hardware')
  async editHardware(@Body()editHardwareDto: CreateHardwareDTO){
    return this.ChannelService.editHardware(editHardwareDto);
  }


  @Get('/backup')
  async backupWithFtp(){
    return await this.ChannelService.backupWithFtp();
  }

  // @Get('/insert')
  //  async insertTestValues(){
  //   return  await this.ChannelService.insertTestValues();
  // }

  // @Get('/inserthardware')
  // async insertHardware(){
  //   return await this.ChannelService.insertTestHarwaresValues();
  // }

}
