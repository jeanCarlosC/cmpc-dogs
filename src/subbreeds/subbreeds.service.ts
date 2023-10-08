import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'
import { Subbreed } from './subbreed.model';

@Injectable()
export class SubbreedsService {
    constructor(
        @InjectModel(Subbreed)
        private subbreedModel: typeof Subbreed,
    ) { }

    async findAll(): Promise<Subbreed[]> {
        return this.subbreedModel.findAll();
    }

    async findOneByName(name: string): Promise<Subbreed | null> {
        return this.subbreedModel.findOne({ where: { name } });
    }

    async findOne(id: number): Promise<Subbreed | null> {
        return this.subbreedModel.findByPk(id);
    }

    async create(subbreed: Subbreed): Promise<Subbreed> {
        return this.subbreedModel.create(subbreed);
    }
}
