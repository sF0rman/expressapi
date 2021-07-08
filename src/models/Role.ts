import { db } from '../database/database';
import { DataTypes, Model } from 'sequelize';

enum UserRoles {
  user = 0,
  premium = 1,
  admin = 2
}

interface RoleData extends Model {
  id: number;
  role: UserRoles;
}

const Role = db.define<RoleData>('Role', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  role: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

export {
  Role,
  UserRoles
}