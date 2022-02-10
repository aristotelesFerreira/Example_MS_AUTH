import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utility/database";

export class UserModel extends Model {
  id: Number;
}

export interface IUserEntity {
  email: string;
  password: string;
  createdAt?: Date;
}

export interface UserModel extends IUserEntity {}

UserModel.init(
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
    sequelize,
  }
);
