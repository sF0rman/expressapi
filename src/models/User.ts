const db = require('../database/database');
import { DataTypes } from 'sequelize';
import { UserRoles } from './Role';

interface UserData {
  email: string,
  password: string,
  role: UserRoles
}

const User = db.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: 'Email is required'
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: 'Password is required'
    }
  },
  role: {
    type: DataTypes.ENUM(UserRoles.admin, UserRoles.user),
    allowNull: false,
    defaultValue: UserRoles.user
  }
});

export {
  UserData,
  User
}