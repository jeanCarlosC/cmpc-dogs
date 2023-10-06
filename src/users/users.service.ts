import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) { }

    async create(dogData: Partial<User>): Promise<User> {
        dogData.password = await this.hashPassword(dogData.password);
        return this.userModel.create(dogData);
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.userModel.findOne({ where: { username } });
    }

    async findById(id: number): Promise<User | null> {
        return this.userModel.findOne({ where: { id } });
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}
