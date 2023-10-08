// src/validators/raza-existe-validator-impl.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SubbreedsService } from '../../subbreeds/subbreeds.service';

@Injectable()
export class SubBreedExistsValidator {
  constructor(private readonly subbreedService: SubbreedsService) { }

  async validate(data: any): Promise<any> {
    const { subbreed_id } = data;
    const breed = await this.subbreedService.findOne(subbreed_id);
    if (!breed) {
      throw new HttpException(`La subraza con el id ${subbreed_id} no existe.`, HttpStatus.NOT_FOUND)
    } else {
      return data
    }
  }
}