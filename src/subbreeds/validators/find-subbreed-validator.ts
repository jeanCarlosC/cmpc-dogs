// src/validators/mascota-nombre-validator-impl.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SubbreedsService } from '../subbreeds.service';

@Injectable()
export class FindDogValidator {
  constructor(private readonly subbreedsService: SubbreedsService) { }

  async validate(data: any): Promise<any> {
    const { id } = data;
    const dog = await this.subbreedsService.findOne(id)
    data['current_dog'] = dog
    if (!dog) {
      throw new HttpException(`La subraza con id ${id} no existe`, HttpStatus.NOT_FOUND)
    } else {
      return data
    }
  }
}
