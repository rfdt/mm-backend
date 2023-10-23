import {ArrayNotEmpty, IsArray, IsString, ValidateNested} from "class-validator";
import {Optional} from "@nestjs/common";
import {Type} from "class-transformer";
import {channel_acc_stopDto, channel_agg_stopDto} from "./newChannel.dto";

export class UpdatedChannelWithCreateDto{

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    add_info: string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    channel_pe:string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    channel_pe_port:string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    channel_vid:string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    channel_region:string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    city:string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    client:string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    contact:string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    date:string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    home:string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    id_cms:string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    id_oss:string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    id_suz:string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    id_tbcd:string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    note:string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    rd_sr:string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    service:string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    service_size:string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    status:string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    street:string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    zabbix:string

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    zabbix_avail:string


    @IsArray({message: "Пожалуйста заполните агрегацию"})
    @ArrayNotEmpty({message: "Пожалуйста заполните агрегацию"})
    @ValidateNested({each: true, message: "Что-то с объектом не так"})
    @Type(() => channel_agg_stopDto)
    channel_agg_stop: channel_agg_stopDto[]


    @IsArray({message: "Пожалуйста заполните доступ"})
    @ArrayNotEmpty({message: "Пожалуйста заполните доступ"})
    @ValidateNested({each: true})
    @Type(() => channel_acc_stopDto)
    channel_acc_stop: channel_acc_stopDto[]

    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    _id:string

    channel_ref: string
}
