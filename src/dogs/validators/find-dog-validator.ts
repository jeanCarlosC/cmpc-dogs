// src/validators/mascota-nombre-validator-impl.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DogsService } from '../dogs.service';

@Injectable()
export class FindDogValidator {
  constructor(private readonly dogsService: DogsService) { }

  async validate(data: any): Promise<any> {
    const { id } = data;
    const dog = await this.dogsService.findOne(id)
    data['current_dog'] = dog
    if (!dog) {
      throw new HttpException(`La mascota con id ${id} no existe`, HttpStatus.NOT_FOUND)
    } else {
      return data
    }
  }
}
