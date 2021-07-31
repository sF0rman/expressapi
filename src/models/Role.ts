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

const Roles = db.define<RoleData>('roles', {
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

Roles.sync().then(async () => {
  const roles = await Roles.findAll();
  if (!roles || !roles.length) {
    console.log('Creating Roles...');
    await Roles.bulkCreate([{
      id: UserRoles.user,
      role: 'user'
    }, {
      id: UserRoles.premium,
      role: 'premium'
    }, {
      id: UserRoles.admin,
      role: 'admin'
    }]);
    console.log('Created Roles!');
  }
}).catch((err) => {
  console.log('Unable to create Roles', err);
})

export {
  Roles,
  UserRoles
};
