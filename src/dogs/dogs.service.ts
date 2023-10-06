import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'
import { Dog } from './dog.model';

@Injectable()
export class DogsService {
    constructor(
        @InjectModel(Dog)
        private dogModel: typeof Dog,
    ) { }

    async findAll(): Promise<Dog[]> {
        return this.dogModel.findAll();
    }

    async findOne(id: number): Promise<Dog | null> {
        return this.dogModel.findByPk(id);
    }

    async findOneByName(name: string): Promise<Dog | null> {
        return this.dogModel.findOne({ where: { name } });
    }
    async create(dogData: Partial<Dog>): Promise<Dog> {
        return this.dogModel.create(dogData);
    }

    async update(id: number, dogData: Partial<Dog>): Promise<any> {
        const dog = await this.dogModel.findByPk(id);
        await dog.update(dogData);
        return dog;
    }

    async remove(id: number): Promise<any> {
        const dog = await this.dogModel.findByPk(id);
        await dog.destroy();
        return dog;
    }

}
