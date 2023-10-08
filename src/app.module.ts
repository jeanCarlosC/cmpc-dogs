import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';

import { SequelizeModule } from '@nestjs/sequelize';
import { BreedsModule } from './breeds/breeds.module';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { SubbreedsModule } from './subbreeds/subbreeds.module';

import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'mysql', // Elige el dialecto de la base de datos
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        autoLoadModels: true, // Opcional: Carga automáticamente los modelos
        synchronize: true, // Opcional: Sincroniza automáticamente las tablas en desarrollo
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    BreedsModule,
    SubbreedsModule,
    DogsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule { }
