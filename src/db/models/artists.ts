import sequelize from '../dbHandler.js';
import { DataTypes, Model } from 'sequelize';
import User from './users.js';

class Artist extends Model {}

Artist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'artist',
  },
);

export default Artist;
