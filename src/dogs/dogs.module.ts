import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dog } from './dog.model'; 
import { Breed } from './breed.model';
import { Subbreed } from './subbreed.model';

@Module({
  imports: [SequelizeModule.forFeature([Dog, Breed, Subbreed])],
  controllers: [DogsController],
  providers: [DogsService],
  exports: [DogsService],
})
export class DogsModule {}
