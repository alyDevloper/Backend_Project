import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";
import LikesModel from "./like.js";
import CommentModel from "./comment.js";

const PostModel = sequelize.define(
  "UserPost",
  {
    Title:{
      type:DataTypes.STRING(100),
      allowNull:false
    },
    Description:{
      type:DataTypes.STRING,
    },
    Image:{
      type:DataTypes.STRING(100),
      allowNull:false
    }
  },
  {
    paranoid:true
  }
);

PostModel.hasMany(LikesModel);
LikesModel.belongsTo(PostModel);

PostModel.hasMany(CommentModel);
CommentModel.belongsTo(PostModel);

export default PostModel;