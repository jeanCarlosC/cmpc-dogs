import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Breed } from '../breeds/breed.model';
import { IsString, IsInt, MinLength, IsDate } from 'class-validator';

@Table
export class Subbreed extends Model<Subbreed> {
    @IsInt()
    @ForeignKey(() => Breed)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    breed_id: string;

    @BelongsTo(() => Breed)
    breed: Breed;

    @IsString()
    @MinLength(3)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;
    
    @IsString()
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;
    
}
