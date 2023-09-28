import { IsString } from "class-validator";

export class findChannelsDTO {

  @IsString({ message: "Please enter valid filter addInfoFilter"})
  addInfoFilter: string;
  @IsString({ message: "Please enter valid filter cityFilter"})
  cityFilter: string;
  @IsString({ message: "Please enter valid filter streetFilter"})
  streetFilter: string;
  @IsString({ message: "Please enter valid filter homeFilter"})
  homeFilter: string;
  @IsString({ message: "Please enter valid filter serviceFilter"})
  serviceFilter: string;
  @IsString({ message: "Please enter valid filter statusFilter"})
  statusFilter: string;
  @IsString({ message: "Please enter valid filter peFilter"})
  peFilter: string;
  @IsString({ message: "Please enter valid filter rdFilter"})
  rdFilter: string;
  @IsString({ message: "Please enter valid filter channelAggStopFilter"})
  channelAggStopFilter: string;
  @IsString({ message: "Please enter valid filter vidFilter"})
  vidFilter: string;
  @IsString({ message: "Please enter valid filter sizeFilter"})
  sizeFilter: string;
  @IsString({ message: "Please enter valid filter channelAccStopFilter"})
  channelAccStopFilter: string;
  @IsString({ message: "Please enter valid filter channelIpMngFilter"})
  channelIpMngFilter: string;
}