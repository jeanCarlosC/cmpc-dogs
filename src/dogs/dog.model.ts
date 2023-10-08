import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Breed } from '../breeds/breed.model';
import { Subbreed } from '../subbreeds/subbreed.model';
import { IsString, IsInt, MinLength, IsDate } from 'class-validator';

@Table
export class Dog extends Model<Dog> {

  @ForeignKey(() => Breed)
  @IsInt()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  breed_id: number;

  @BelongsTo(() => Breed)
  breed: Breed;

  @ForeignKey(() => Subbreed)
  @IsInt()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  subbreed_id: number;

  @BelongsTo(() => Subbreed)
  subbreed: Subbreed;

  @IsString()
  @MinLength(2)
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
  color: string;

  @IsDate()
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthDate: Date;

}