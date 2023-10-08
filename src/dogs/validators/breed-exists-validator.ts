// src/validators/raza-existe-validator-impl.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BreedsService } from '../../breeds/breeds.service';

@Injectable()
export class BreedExistsValidator {
  constructor(private readonly breedService: BreedsService) { }

  async validate(data: any): Promise<any> {
    const { breed_id } = data;
    const breed = await this.breedService.findOne(breed_id);
    if (!breed) {
      throw new HttpException(`La raza con el id ${breed_id} no existe.`, HttpStatus.NOT_FOUND)
    } else {
      return data
    }
  }
}