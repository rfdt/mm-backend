import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { registerUserDTO } from "./dto/registerUser.dto";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { loginUserDTO } from "./dto/loginUser.dto";


@Injectable()
export class AuthService {

  constructor(private userService: UserService,
              private jwtService: JwtService) {
  }

  async registerUser(candidateData: registerUserDTO){
    try {
      const candidateByLogin = await this.userService.getUserByLogin(candidateData.login);
      if (candidateByLogin) {
         throw new Error('Пользователь с таким логином уже существует')
      }
      const candidateByName = await this.userService.getUserByName(candidateData.name);
      if(candidateByName){
        throw new Error(`Пользователь ${candidateData.name} уже существует`)
      }
      const hashPassword = await bcrypt.hash(candidateData.password, 5);
      const user = await this.userService.createUser({...candidateData, password_hash: hashPassword})
      return {
        token: await this.generateToken(user._id, user.roles),
        user: user
      }
    }catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async loginUser(loginUserDTO: loginUserDTO){
    try {
      const user = await this.validateUser(loginUserDTO)
      return {
        token: await this.generateToken(user._id, user.roles),
        user: user
      }
    }catch (e){
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAuthUser(userId: string){
    try {
      const user = await this.userService.getUserById(userId)
      return user
    }catch (e){
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  private async generateToken(_id: string, roles: string[]) {
    try {
      const payload = {_id, roles}
      return this.jwtService.sign(payload)
    }catch (e){
      throw new HttpException('Что-то пошло не так во время создания токена', HttpStatus.BAD_REQUEST)
    }
  }

  private async validateUser(loginUserDTO: loginUserDTO) {
    try {
      const user = await this.userService.getUserByLogin(loginUserDTO.login)
      if(!user){
        throw new Error('Пользователь не найден')
      }
      const passwordEquals = await bcrypt.compare(loginUserDTO.password, user.password_hash);
      if (user && passwordEquals) {
        return user;
      }
      throw new Error('Некорректный пароль')
    }catch (e){
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

}
