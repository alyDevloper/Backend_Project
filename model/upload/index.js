import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";

const ImageModel = sequelize.define("Image", {
  filename: {
    type: DataTypes.STRING,
  },
  size: {
    type: DataTypes.INTEGER,
  },
  data: {
    type: DataTypes.BLOB,
  },
});

export default ImageModel;
