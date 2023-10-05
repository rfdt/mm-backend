import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles.auth.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,
              private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ])
      const req = context.switchToHttp().getRequest();
      const token = req.headers.token;

      if (!token) {
        throw new UnauthorizedException('Пользователь не авторизован')
      }
      const user = this.jwtService.verify(token);
      req.user = user;

      if (!requiredRoles) {
        return true;
      }

      return user.roles.some(role => requiredRoles.includes(role));
    } catch (e) {
      throw new HttpException( e.message, HttpStatus.UNAUTHORIZED)
    }
  }

}