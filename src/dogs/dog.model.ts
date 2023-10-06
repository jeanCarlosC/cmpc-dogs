import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { Breed } from './breed.model';
import { Subbreed } from './subbreed.model';

@Table
export class Dog extends Model<Dog> {

  @ForeignKey(() => Breed)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  breed_id: number;

  @ForeignKey(() => Subbreed)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  subbreed_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  breed: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  birthDate: Date;
}