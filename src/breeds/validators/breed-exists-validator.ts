// src/validators/mascota-nombre-validator-impl.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BreedsService } from '../breeds.service';

@Injectable()
export class BreedExistsValidator {
  constructor(private readonly breedsService: BreedsService) { }

  async validate(data: any): Promise<any> {
    const { name } = data;
    const breed = await this.breedsService.findOneByName(name);
    if (breed) {
      throw new HttpException(`La raza con el nombre ${name} ya existe.`, HttpStatus.CONFLICT)
    } else {
      return data
    }
  }
}
