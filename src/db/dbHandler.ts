import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('artist_collective', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: true,
  // dialectOptions: { socketPath: "mysql.sock" },
});

export default sequelize;
