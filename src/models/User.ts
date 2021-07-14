import { compare, genSalt, hash } from 'bcryptjs';
import { createHash, randomBytes } from 'crypto';
import { sign } from 'jsonwebtoken';
import { DataTypes, Model } from 'sequelize';
import { db } from '../database/database';
import { ErrorResponse, ErrorType } from '../utils/errorHandler';
import { addToDate, DateUnits } from '../utils/utils';
import { HTTPCode } from './HTTPCodes';
import { Role, UserRoles } from './Role';

interface UserData extends Model {
  email: string;
  password?: string;
  role?: UserRoles;
  getJwt?: () => string;
  matchPassword?: (string) => Promise<boolean>;
  getResetPasswordToken?: () => string;
  clearResetPasswordToken?: () => void;
}

class UserExistsError extends ErrorResponse {
  name: string = ErrorType.UserExistsError;
  constructor(message: string) {
    super(HTTPCode.Conflict);
    this.message = `User with supplied email (${message}) already exists`;
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
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    references: {
      model: Role,
      key: 'id'
    }
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
      if (user.changed('password')) {
        const salt = await genSalt(10);
        user.password = await hash(user.password, salt);
      }
    }
  },
});

User.prototype.getJwt = function () {
  return sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

User.prototype.matchPassword = async function (password: string) {
  return await compare(password, this.password);
}

User.prototype.getResetPasswordToken = function (): string {
  const resetToken = randomBytes(20).toString('hex');
  this.resetPasswordToken = createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = new Date(Date.now() + addToDate(10, DateUnits.min));
  this.save({ validateBeforeSave: false });

  return resetToken;
}

User.prototype.clearResetPasswordToken = function (): void {
  this.resetPasswordToken = undefined;
  this.resetPasswordExpire = undefined;
  this.save({ validateBeforeSave: false });
}

const isValidUserData = (obj: any): obj is UserData => {
  return 'email' in obj;
}

export {
  UserData,
  User,
  UserExistsError,
  isValidUserData
};
