import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthMiddleware } from './auth.middleware';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwtConstants.secret';
import { ApiKeyStrategy } from './strategy/api-key.strategy';

@Module({
  imports: [PassportModule, ConfigModule, UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [AuthService, /* ApiKeyStrategy */],
  controllers: [AuthController],
  exports:[AuthService],
})
export class AuthModule /* implements NestModule */ {
  /* configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware).forRoutes('*');
  } */
}
