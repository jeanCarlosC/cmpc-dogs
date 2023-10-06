import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dog } from './dog.model'; 

@Module({
  imports: [SequelizeModule.forFeature([Dog])],
  controllers: [DogsController],
  providers: [DogsService],
  exports: [DogsService],
})
export class DogsModule {}
