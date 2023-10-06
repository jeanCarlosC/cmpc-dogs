import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table
export class Breed extends Model<Breed> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  height: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  weight: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lifeSpan: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  origin: string;
}