import {IsString} from "class-validator";

export class newChannelDto{
    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    add_info: string
    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    channel_acc_mac: string
    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    channel_acc_model: string
    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    channel_acc_port: string
    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    channel_acc_sn: string
    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    channel_acc_stop: string
    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    channel_agg_port: string
    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    channel_agg_stop:string
    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    channel_ip_mng_acc:string
    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    channel_pe:string
    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    channel_pe_port:string
    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    channel_region:string
    @IsString({ message: "Пожалуйста ввведите корректное поле "})
    channel_vid:string
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
}
