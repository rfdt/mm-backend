import { IsString } from "class-validator";

export class createUserDTO {

  @IsString({ message: "Please enter valid filter name"})
  name: string

  @IsString({ message: "Please enter valid filter email"})
  login: string

  @IsString({ message: "Please enter valid filter password"})
  password_hash: string

  @IsString({ message: "Please enter valid filter role"})
  role: string
}