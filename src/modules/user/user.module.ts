import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Module({
  imports : [TypeOrmModule.forFeature([User]) ,
  forwardRef(() => AuthModule),],
  controllers: [UserController],
  providers: [UserService,],
  exports: [UserService,TypeOrmModule,],
})
export class UserModule {}
