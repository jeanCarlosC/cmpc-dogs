import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { Breed } from './breed.model';

@Table
export class Subbreed extends Model<Subbreed> {
    
    @ForeignKey(() => Breed)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    breed_id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;
    
}
