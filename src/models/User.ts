import { db } from '../database/database';
import { DataTypes, ModelDefined, Model } from 'sequelize';
import { ErrorResponse, ErrorType } from '../controller/ErrorHandler';
import { HTTPCode } from './HTTPCodes';
import { UserRoles } from './Role';
import { genSalt, hash } from 'bcryptjs';

interface UserData extends Model {
  email: string;
  password?: string;
  role?: UserRoles;
}


class UserExistsError extends ErrorResponse {
  name: string = ErrorType.UserExistsError;
  constructor(message: string) {
    super(`User with supplied email (${message}) already exists`, HTTPCode.Conflict);
  }
}

const User = db.define<UserData>('User', {
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
      notNull: { msg: 'Email is required' }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Password is required' }
    }
  },
  role: {
    type: DataTypes.ENUM(UserRoles.admin, UserRoles.user),
    allowNull: false,
    defaultValue: UserRoles.user
  },
  resetPasswordToken: {
    type: DataTypes.STRING
  },
  resetPasswordExpire: {
    type: DataTypes.DATE
  }
}, {
  defaultScope: {
    attributes: { exclude: ['password', 'resetPasswordToken', 'resetPasswordExpire'] }
  },
  hooks: {
    beforeCreate: async (user: UserData, options) => {
      const salt = await genSalt(10);
      user.password = await hash(user.password, salt);
    }
  }
});

const isValidUserData = (obj: any): obj is UserData => {
  return 'email' in obj;
}

export {
  UserData,
  User,
  UserExistsError,
  isValidUserData
}