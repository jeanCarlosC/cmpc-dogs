import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql', // Puedes cambiarlo según la base de datos que estés utilizando
      host: 'mysql',
      username: 'root',
      password: 'admin',
      database: 'dog_manager',
      autoLoadModels: true, // Esto carga automáticamente los modelos definidos
    }),
    DogsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
