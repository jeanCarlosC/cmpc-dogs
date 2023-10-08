import { Module, ValidationPipe } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dog } from './dog.model';
import { Breed } from '../breeds/breed.model';
import { Subbreed } from '../subbreeds/subbreed.model';
import { ValidationHandler } from 'src/common/validation-handler';
import { BreedsModule } from 'src/breeds/breeds.module';
import { SubbreedsModule } from 'src/subbreeds/subbreeds.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Dog]),
    BreedsModule,
    SubbreedsModule
  ],
  controllers: [DogsController],
  providers: [
    DogsService,
    ValidationHandler,
    {
      provide: 'ValidationPipe',
      useValue: new ValidationPipe(),
    },
  ],
  exports: [DogsService],
})
export class DogsModule { }
