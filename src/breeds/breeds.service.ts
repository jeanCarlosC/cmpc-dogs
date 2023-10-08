import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'
import { Breed } from './breed.model';

@Injectable()
export class BreedsService {
    constructor(
        @InjectModel(Breed)
        private breedModel: typeof Breed,
    ) { }

    async findAll(): Promise<Breed[]> {
        return this.breedModel.findAll();
    }

    async findOne(id: number): Promise<Breed | null> {
        return this.breedModel.findByPk(id);
    }

    async create(breed: Breed): Promise<Breed> {
        return this.breedModel.create(breed);
    }

    async findOneByName(name: string): Promise<Breed | null> {
        return this.breedModel.findOne({ where: { name } });
    }

    async update(id: number, breed: Breed): Promise<any> {
        return this.breedModel.update(breed, { where: { id } });
    }

    async delete(id: number):Promise<any> {
        return this.breedModel.destroy({ where: { id } });
    }
}
