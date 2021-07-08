import { DataTypes, Model } from 'sequelize';
import { db } from '../database/database';

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
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

Role.sync().then(async () => {
  const roles = await Role.findAll();
  if (!roles) {
    await Role.bulkCreate([{
      id: UserRoles.user,
      role: 'user'
    }, {
      id: UserRoles.premium,
      role: 'premium'
    }, {
      id: UserRoles.admin,
      role: 'admin'
    }]);
  }
}).catch((err) => {
  console.log('Unable to create Roles', err);
})

export {
  Role,
  UserRoles
};
