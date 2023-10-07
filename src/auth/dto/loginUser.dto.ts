import { IsString } from "class-validator";

export class loginUserDTO{

  @IsString({ message: "Пожалуйста введите корректный логин" })
  login: string;

  @IsString({ message: "Пожалуйста введите корректный пароль" })
  password: string
}
