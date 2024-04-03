import { Router } from "express";
import UserController from "../../controller/user/index.js";
import ContactController from "../../controller/user/contact.js";
import FollowingPostController from "../../controller/user/followingpost.js";
import AuthMiddleware from "../../middleware/authmiddleware.js";

const UserRouter = Router();
UserRouter.post("/user", UserController.create);
UserRouter.get("/user", UserController.read);
UserRouter.put("/user/:user_id", AuthMiddleware, UserController.update);
UserRouter.delete("/user/:user_id", AuthMiddleware, UserController.delete);

UserRouter.post(
  "/user/:followerID/follow",
  AuthMiddleware,
  UserController.follow
);

UserRouter.get(
  "/followerpost/:follower_id",
  AuthMiddleware,
  FollowingPostController.Getposts
);

UserRouter.put(
  "/contact/:contact_id",
  AuthMiddleware,
  ContactController.update
);
UserRouter.delete(
  "/contact/:contact_id",
  AuthMiddleware,
  ContactController.delete
);

export default UserRouter;
