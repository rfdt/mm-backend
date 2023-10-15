import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    forwardRef(()=>UserModule),
    JwtModule.register({
      secret: 'SOME_SECRET_KEY',
      signOptions: {
        expiresIn: '16h'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [
    AuthService,
    JwtModule
  ]
})

export class AuthModule {}
