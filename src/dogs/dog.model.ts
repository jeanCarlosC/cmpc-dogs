import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table
export class Dog  extends Model<Dog> {
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
  age: number;
}