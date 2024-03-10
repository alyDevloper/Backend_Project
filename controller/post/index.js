import PostModel from "../../model/post/index.js";
import LikesModel from "../../model/post/like.js";
import Joi from "joi";
const PostController = {
  create: async (req, res) => {
    try {
      const payload = req.body;
      const user_id = req.user.id;

      const schema = Joi.object({
        Title: Joi.string().min(3).max(15).required(),
        Description: Joi.string().min(3).max(40).required(),
      });

      const isValidate = schema.validate(payload);
      if (isValidate.error) {
        return res
          .status(400)
          .json({ message: "Invalid data", error: isValidate.error });
      }

      if (
        !payload ||
        !payload.Title ||
        !payload.Description ||
        !payload.Image
      ) {
        return res.status(400).json({
          message: "Invalid or incomplete payload",
        });
      }

      const post = new PostModel();
      post.Title = payload.Title;
      post.Description = payload.Description;
      post.Image = payload.Image;
      post.UserId = user_id;
      await post.save();

      const likeEntry = await LikesModel.create({
        UserPostId: post.id,
      });

      res.json({
        message: "Post Created",
        post,
        likeEntry,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
  read: async (req, res) => {
    try {
      console.log(req.user);
      const getpost = await PostModel.findAll({
        // include:[LikesModel,CommentModel]
      });

      res.json({
        getpost,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
  update: async (req, res) => {
    try {
      const post_id = req.params.post_id;
      const post = await PostModel.findByPk(post_id);

      const schema = Joi.object({
        Title: Joi.string().min(3).max(15).required(),
        Description: Joi.string().min(3).max(40).required(),
      });

      const isValidate = schema.validate(payload);
      if (isValidate.error) {
        return res
          .status(400)
          .json({ message: "Invalid data", error: isValidate.error });
      }

      if (!post) {
        return res.status(404).json({
          message: "No user found",
        });
      }

      post.Title = req.body.Title;

      await post.save();

      res.json({
        post,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
  delete: async (req, res) => {
    try {
      const post_id = req.params.post_id;

      const DeletedPost = await PostModel.destroy({ where: { id: post_id } });

      if (DeletedPost === 1) {
        return res.status(200).json({
          message: "Post deleted successfully",
        });
      } else {
        return res.status(404).json({
          message: "Post not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
};

export default PostController;
