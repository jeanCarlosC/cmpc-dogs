// src/validators/mascota-nombre-validator-impl.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DogsService } from '../dogs.service';

@Injectable()
export class DogExistsValidator {
  constructor(private readonly dogsService: DogsService) { }

  async validate(data: any): Promise<any> {
    const { name } = data;
    const dog = await this.dogsService.findOneByName(name);
    if (dog) {
      throw new HttpException(`La mascota con el nombre ${name} ya existe.`, HttpStatus.CONFLICT)
    } else {
      return data
    }
  }
}
