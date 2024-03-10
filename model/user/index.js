import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";
import ContactModel from "./contact.js";
import PostModel from "../post/index.js";
import CommentModel from "../post/comment.js";

const UserModel = sequelize.define(
  "User",
  {
    FirstName:{
      type:DataTypes.STRING,
      allowNull:false
    },
    LastName:{
      type:DataTypes.STRING,
    },
    Username:{
      type:DataTypes.STRING(50),
      allowNull:false
    },
    Email:{
      type:DataTypes.STRING,
      allowNull:false
    },
    Password:{
      type:DataTypes.STRING,
      allowNull:false
    },
  },
  {
    paranoid:true,
  }
);

UserModel.hasOne(ContactModel);
ContactModel.belongsTo(UserModel);

UserModel.hasMany(PostModel);
PostModel.belongsTo(UserModel);

UserModel.hasMany(CommentModel);
CommentModel.belongsTo(UserModel);

export default UserModel;