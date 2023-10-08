// src/validators/raza-existe-validator-impl.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SubbreedsService } from '../subbreeds.service';

@Injectable()
export class SubBreedExistsValidator {
  constructor(private readonly subbreedService: SubbreedsService) { }

  async validate(data: any): Promise<any> {
    const { name } = data;
    const breed = await this.subbreedService.findOneByName(name);
    if (breed) {
      throw new HttpException(`La subraza con el nombre ${name} ya existe.`, HttpStatus.NOT_FOUND)
    } else {
      return data
    }
  }
}