const db = require('../database/database');
import { DataTypes } from 'sequelize';

enum UserRoles {
  admin = 'ADMIN',
  user = 'USER'
}

const Roles = db.define('Role', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  role: {
    type: DataTypes.ENUM(UserRoles.admin, UserRoles.user),
    allowNull: false
  }
});

export {
  Roles,
  UserRoles
}