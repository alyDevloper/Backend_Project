import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import UserModel from "./index.js";

const UserFollowModel = sequelize.define(
  "UserFollower",
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      }
  },
  {
    paranoid: true,
  }
);

UserFollowModel.belongsTo(UserModel, { as: "Follower" });
UserFollowModel.belongsTo(UserModel, { as: "Followee" });

UserModel.belongsToMany(UserModel, {
  through: UserFollowModel,
  as: "Follower",

  foreignKey: "FollowerId",
});
UserModel.belongsToMany(UserModel, {
  through: UserFollowModel,
  as: "Followee",

  foreignKey: "FolloweeId",
});

export default UserFollowModel;