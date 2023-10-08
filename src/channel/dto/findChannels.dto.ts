import { IsString } from "class-validator";

export class findChannelsDTO {

  @IsString({ message: "Пожалуйста ввведите корректный фильтр - addInfoFilter"})
  addInfoFilter: string;
  @IsString({ message: "Пожалуйста ввведите корректный фильтр - cityFilter"})
  cityFilter: string;
  @IsString({ message: "Пожалуйста ввведите корректный фильтр - streetFilter"})
  streetFilter: string;
  @IsString({ message: "Пожалуйста ввведите корректный фильтр - homeFilter"})
  homeFilter: string;
  @IsString({ message: "Пожалуйста ввведите корректный фильтр - serviceFilter"})
  serviceFilter: string;
  @IsString({ message: "Пожалуйста ввведите корректный фильтр - statusFilter"})
  statusFilter: string;
  @IsString({ message: "Пожалуйста ввведите корректный фильтр - peFilter"})
  peFilter: string;
  @IsString({ message: "Пожалуйста ввведите корректный фильтр - rdFilter"})
  rdFilter: string;
  @IsString({ message: "Пожалуйста ввведите корректный фильтр - channelAggStopFilter"})
  channelAggStopFilter: string;
  @IsString({ message: "Пожалуйста ввведите корректный фильтр - vidFilter"})
  vidFilter: string;
  @IsString({ message: "Пожалуйста ввведите корректный фильтр - sizeFilter"})
  sizeFilter: string;
  @IsString({ message: "Пожалуйста ввведите корректный фильтр - channelAccStopFilter"})
  channelAccStopFilter: string;
  @IsString({ message: "Пожалуйста ввведите корректный фильтр - channelIpMngFilter"})
  channelIpMngFilter: string;
  @IsString({ message: "Пожалуйста ввведите корректный фильтр - channelRegionFilter"})
  channelRegionFilter: string;
}
