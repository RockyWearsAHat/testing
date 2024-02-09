import sequelize from '../dbHandler.js';
import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import Artist from './artists.js';

class User extends Model {
  declare username: string;
  declare email: string;
  declare password: string;
  declare firstName: string;
  declare lastName: string;
  declare displayName: string;
  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true,
        max: 128,
      },
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        max: 320,
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        is: /^[a-zA-Z0-9!@#$%^&*]*$/,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
      },
    },
    displayName: {
      type: DataTypes.STRING,
    },
    // artistId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'artist',
    //     key: 'id',
    //   },
    // },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'user',
    hooks: {
      beforeCreate: (User) => {
        const salt = bcrypt.genSaltSync();
        User.password = bcrypt.hashSync(User.password, salt);
      },
    },
  },
);

export default User;
