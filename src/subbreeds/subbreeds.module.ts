import { Module, ValidationPipe } from '@nestjs/common';
import { SubbreedsService } from './subbreeds.service';
import { SubbreedsController } from './subbreeds.controller';
import { ValidationHandler } from 'src/common/validation-handler';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subbreed } from './subbreed.model';
import { BreedsModule } from 'src/breeds/breeds.module';

@Module({
  imports: [
    BreedsModule,
    SequelizeModule.forFeature([Subbreed]),
  ],
  providers: [
    SubbreedsService,
    ValidationHandler,
    {
      provide: 'ValidationPipe',
      useValue: new ValidationPipe(),
    }],
  controllers: [SubbreedsController],
  exports: [SubbreedsService]
})
export class SubbreedsModule { }
