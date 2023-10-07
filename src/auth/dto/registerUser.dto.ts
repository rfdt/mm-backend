import { IsString } from "class-validator";

export class registerUserDTO {

  @IsString({ message: "Пожалуйста введите корректное ФИО"})
  name: string

  @IsString({ message: "Пожалуйста введите корректный логин"})
  login: string

  @IsString({ message: "Пожалуйста введите корректный пароль"})
  password: string

  @IsString({ message: "Пожалуйста введите корректную роль"})
  role: string
}
