import { db } from '../database/database';
import { DataTypes, Model } from 'sequelize';

enum UserRoles {
  admin = 'ADMIN',
  user = 'USER'
}

interface RoleData extends Model {
  id: number;
  role: UserRoles;
}

const Roles = db.define<RoleData>('Role', {
  id: {
    type: DataTypes.NUMBER,
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