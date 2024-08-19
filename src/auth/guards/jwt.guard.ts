/* eslint-disable prettier/prettier */
import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      console.log('Inside JWT AuthGuard canActivate');
      const canActivate = super.canActivate(context);
      console.log('canActivate result:', canActivate);
      return canActivate;
    }
  }
  