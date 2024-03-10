import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";

const LikesModel = sequelize.define(
    "PostLikes",
    {
        Likes:{
            type:DataTypes.INTEGER,
            defaultValue:0,
        },
        DisLikes:{
            type:DataTypes.INTEGER,
            defaultValue: 0,
        }
    },
    {
        paranoid:true
    }
);

export default LikesModel;