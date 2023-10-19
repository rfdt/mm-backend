import {IsString} from "class-validator";

export class CreateHardwareDTO{
    @IsString({ message: "Пожалуйста ввведите корректное значение - title"})
    title: string;

    @IsString({ message: "Пожалуйста ввведите корректное значение - uplink"})
    uplink: string;

    @IsString({ message: "Пожалуйста ввведите корректное значение - uplink_type"})
    uplink_type: string;

    @IsString({ message: "Пожалуйста ввведите корректное значение - hardware_type"})
    hardware_type: string;
}
