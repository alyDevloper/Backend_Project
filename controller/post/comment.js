import CommentModel from "../../model/post/comment.js";
import Joi from "joi";

const CommentController = {
  create: async (req, res) => {
    try {
      const payload = req.body;
      const post_id = req.params.post_id;
      const user_id = req.params.user_id;

      const schema = Joi.object({
        Description: Joi.string().min(3).max(40).required(),
      });

      const isValidate = schema.validate(payload);
      if (isValidate.error) {
        return res
          .status(400)
          .json({ message: "Invalid data", error: isValidate.error });
      }

      const comment = new CommentModel();
      comment.Description = payload.Description;
      comment.UserPostId = post_id;
      comment.UserId = user_id;
      await comment.save();

      res.json({
        message: "Comment added successfully",
        comment,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
  read: async (req, res) => {
    try {
      const getcomment = await CommentModel.findAll({});

      res.json({
        getcomment,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
  update: async (req, res) => {
    try {
      const comment_id = req.params.comment_id;
      const comment = await CommentModel.findByPk(comment_id);

      const schema = Joi.object({
        Description: Joi.string().min(3).max(40).required(),
      });

      const isValidate = schema.validate(payload);
      if (isValidate.error) {
        return res
          .status(400)
          .json({ message: "Invalid data", error: isValidate.error });
      }

      if (!comment) {
        return res.status(404).json({
          message: "No user found",
        });
      }

      comment.Description = req.body.Description;

      await comment.save();

      res.json({
        comment,
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
      const comment_id = req.params.comment_id;

      const DeletedComment = await CommentModel.destroy({
        where: { id: comment_id },
      });

      if (DeletedComment === 1) {
        return res.status(200).json({
          message: "Comment deleted successfully",
        });
      } else {
        return res.status(404).json({
          message: "Comment not found",
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

export default CommentController;
