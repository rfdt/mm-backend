import { ArrayNotEmpty, IsArray, IsBoolean, IsString, Validate, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class channel_agg_stopDto{
    @IsString({message: "Пожалуйста ввведите корректное поле agg_stop inside channel_agg_stopDto"})
    agg_stop: string;

    @IsString({message: "Пожалуйста ввведите корректное поле agg_port inside channel_agg_stopDto"})
    agg_port: string;

    @IsBoolean()
    withStop: boolean;
}

export class channel_acc_stopDto{
    @IsString({message: "Пожалуйста ввведите корректное поле agg_port inside channel_agg_stopDto"})
    acc_stop: string;

    @IsString({message: "Пожалуйста ввведите корректное поле agg_port inside channel_agg_stopDto"})
    acc_port  : string;

    @IsString({message: "Пожалуйста ввведите корректное поле agg_port inside channel_agg_stopDto"})
    acc_ip_mng: string;

    @IsString({message: "Пожалуйста ввведите корректное поле agg_port inside channel_agg_stopDto"})
    acc_model: string;

    @IsString({message: "Пожалуйста ввведите корректное поле agg_port inside channel_agg_stopDto"})
    acc_sn: string;

    @IsString({message: "Пожалуйста ввведите корректное поле agg_port inside channel_agg_stopDto"})
    acc_mac: string;

    @IsBoolean()
    withStop: boolean;
}

export class newChannelDto{
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
}
