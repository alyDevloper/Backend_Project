import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";

const ContactModel = sequelize.define(
    "UserContact",
    {
        Phone:{
            type:DataTypes.STRING(20),
        },
        Mobile:{
            type:DataTypes.STRING(20),
            allowNull:false,
        }
    },
    {
        paranoid:true,
    }
);

export default ContactModel;