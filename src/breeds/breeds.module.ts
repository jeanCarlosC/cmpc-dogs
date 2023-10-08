import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Breed } from './breed.model';
import { BreedsController } from './breeds.controller';
import { ValidationHandler } from 'src/common/validation-handler';

@Module({
  imports: [
    SequelizeModule.forFeature([Breed])
  ],
  providers: [BreedsService, ValidationHandler],
  controllers: [BreedsController],
  exports: [BreedsService]
})
export class BreedsModule {}
