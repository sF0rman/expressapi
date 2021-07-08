import { db } from '../database/database';
import { DataTypes, Model } from 'sequelize';

enum UserRoles {
  admin = 'ADMIN',
  premium = 'PREMIUM',
  user = 'USER'
}

interface RoleData extends Model {
  id: number;
  role: UserRoles;
}

const Roles = db.define<RoleData>('Role', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  role: {
    type: DataTypes.ENUM(UserRoles.admin, UserRoles.premium, UserRoles.user),
    allowNull: false
  }
}, {
  timestamps: false
});

export {
  Roles,
  UserRoles
}