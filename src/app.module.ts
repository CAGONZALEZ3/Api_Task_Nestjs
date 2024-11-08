import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';

@Module({
  //imports: [AuthModule],
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  UserModule, TaskModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
