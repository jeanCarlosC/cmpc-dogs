// src/validators/mascota-nombre-validator-impl.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DogsService } from '../dogs.service';

@Injectable()
export class DogExistsUpdateValidator {
  constructor(private readonly dogsService: DogsService) { }

  async validate(data: any): Promise<any> {
    const { name, current_dog } = data;
    const dog = await this.dogsService.findOneByName(name);
    if (dog && dog["id"] !== current_dog.id) {
      throw new HttpException(`La mascota con el nombre ${name} ya existe.`, HttpStatus.CONFLICT)
    } else {
      return data
    }
  }
}
