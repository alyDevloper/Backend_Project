import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";

const CommentModel = sequelize.define(
    "PostComments",
    {
        Description:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    },{
        paranoid:true
    }
);

export default CommentModel;