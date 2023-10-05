import { IsString } from "class-validator";

export class loginUserDTO{

  @IsString({ message: "Please enter valid filter string" })
  login: string;

  @IsString({ message: "Please enter valid filter password" })
  password: string
}