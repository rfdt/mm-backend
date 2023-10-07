import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { registerUserDTO } from "./dto/registerUser.dto";
import { loginUserDTO } from "./dto/loginUser.dto";
import { AuthGuard } from "./auth.guard";
import { UserID } from "./userId.decorator";
import { Roles } from "./roles.auth.decorator";

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {

  }

  @Post('/register')
  async registerUser(@Body() registerUserDTO: registerUserDTO){
    return await this.AuthService.registerUser(registerUserDTO);
  }

  @Post('/login')
  async loginUser(@Body() loginUserDTO: loginUserDTO){
    return await this.AuthService.loginUser(loginUserDTO);
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  async getAuthUser(@UserID() userId: string){
    return await this.AuthService.getAuthUser(userId);
  }

}
