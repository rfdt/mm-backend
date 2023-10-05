import { IsString } from "class-validator";

export class registerUserDTO {

  @IsString({ message: "Please enter valid filter name"})
  name: string

  @IsString({ message: "Please enter valid filter email"})
  login: string

  @IsString({ message: "Please enter valid filter password"})
  password: string

  @IsString({ message: "Please enter valid filter role"})
  role: string
}