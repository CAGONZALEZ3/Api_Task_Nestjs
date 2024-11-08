import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
              type: 'mysql',
              host: configService.get('DATABASE_HOST'),
              port: parseInt(configService.get('DATABASE_PORT'), 10),
              username: configService.get('DATABASE_USER'),
              password: configService.get('DATABASE_PASSWORD'),
              database: configService.get('DATABASE_NAME'),
              autoLoadEntities: true,
              entities: /* [User,Task], */ [__dirname + '/../**/*.entity{.ts,.js}'],
              synchronize: false, // Solo en desarrollo, no en producción
            }),
          })
    ]
})
export class DatabaseModule {}
