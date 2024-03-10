import { Router } from "express";
import PostController from "../../controller/post/index.js";
import LikesController from "../../controller/post/like.js";
import CommentController from "../../controller/post/comment.js";
import AuthMiddleware from "../../middleware/authmiddleware.js";

const PostRouter = Router();

PostRouter.post("/post", AuthMiddleware, PostController.create);
PostRouter.get("/post", AuthMiddleware, PostController.read);
PostRouter.put("/post/:post_id", AuthMiddleware, PostController.update);
PostRouter.delete("/post/:post_id", AuthMiddleware, PostController.delete);

PostRouter.get("/comment", AuthMiddleware, CommentController.read);

PostRouter.post(
  "/:user_id/comment/:post_id",
  AuthMiddleware,
  CommentController.create
);

PostRouter.put(
  "/comment/:comment_id",
  AuthMiddleware,
  CommentController.update
);
PostRouter.delete(
  "/comment/:comment_id",
  AuthMiddleware,
  CommentController.delete
);

PostRouter.post("/like/:post_id", AuthMiddleware, LikesController.like);
PostRouter.post("/dislike/:post_id", AuthMiddleware, LikesController.dislike);

export default PostRouter;
