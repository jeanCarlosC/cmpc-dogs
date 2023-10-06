import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'tareas_db',
});
