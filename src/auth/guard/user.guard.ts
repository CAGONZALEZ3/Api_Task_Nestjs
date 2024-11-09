import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';


@Injectable()
export class UserGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService
  ){

  }

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    console.log('entro en authguard user');
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Session expirada');
    }

    const user =await this.authService.validatetoken(token);
    
    request.metadata = { userId: user.sub};
    // const userId = request.body?.userId ?? request.headers?.userId ?? request.params?.userId;
    

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
