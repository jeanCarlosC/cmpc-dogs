import { Model, Table, Column, DataType } from 'sequelize-typescript';
import { IsString, IsInt, MinLength, IsDate } from 'class-validator';

@Table
export class Breed extends Model<Breed> {
  @IsString()
  @MinLength(3)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @IsInt()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  height: number;

  @IsInt()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  weight: number;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lifeSpan: string;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  origin: string;
}