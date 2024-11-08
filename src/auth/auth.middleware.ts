import { ForbiddenException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwtConstants.secret';
import passport from 'passport';


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService
  ){
  }

  async use(req: Request, res: Response, next: () => void) {
    console.log(req.headers);
    /* passport.authenticate('headerapikey', (value) => {
      if (value) {
        next();
      } else {
        throw new ForbiddenException();
      }
    })(req, res, next); */
    /* const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      )

    } catch (error) {
    throw new UnauthorizedException();
    } */
    next();
  }
}
