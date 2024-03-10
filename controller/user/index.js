import UserModel from "../../model/user/index.js";
import ContactModel from "../../model/user/contact.js";
import UserFollowModel from "../../model/user/userfollow.js";
import Joi from "joi";

const UserController = {
  create: async (req, res) => {
    try {
      const payload = req.body;

      const schema = Joi.object({
        FirstName: Joi.string().min(3).max(30).alphanum().required(),
        LastName: Joi.string().min(3).max(30).alphanum(),
        Username: Joi.string().min(3).max(20).required().alphanum(),
        Password: Joi.string().min(8).max(15).required(),
        Email: Joi.string().min(10).max(30).required().email(),
        Mobile: Joi.string().min(8).max(16).required(),
        Phone: Joi.string().min(8).max(16),
      });

      const isValidate = schema.validate(payload);
      if (isValidate.error) {
        return res
          .status(400)
          .json({ message: "Invalid data", error: isValidate.error });
      }

      let check = await UserModel.findOne({
        where: {
          Email: payload.Email,
        },
      });
      if (check) {
        return res.status(400).json({
          message: "User with this email already exist",
        });
      }
      check = await UserModel.findOne({
        where: {
          Username: payload.Username,
        },
      });
      if (check) {
        return res.status(400).json({
          message: "User with this username already exist",
        });
      }
      check = await ContactModel.findOne({
        where: {
          Mobile: payload.Mobile,
        },
      });
      if (check) {
        return res.status(400).json({
          message: "User with this mobile number already exist",
        });
      }

      const user = new UserModel();
      user.FirstName = payload.FirstName;
      user.LastName = payload.LastName;
      user.Username = payload.Username;
      user.Password = payload.Password;
      user.Email = payload.Email;
      await user.save();

      const contact = new ContactModel();
      contact.Phone = payload.Phone;
      contact.Mobile = payload.Mobile;
      contact.UserId = user.id;
      await contact.save();

      res.json({
        message: "User Created",
        user,
        contact,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
  read: async (req, res) => {
    try {
      const getuser = await UserModel.findAll({
        // include:[ContactModel,PostModel]
      });

      res.json({
        getuser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
  update: async (req, res) => {
    try {
      const user_id = req.params.user_id;
      const user = await UserModel.findByPk(user_id);

      const schema = Joi.object({
        FirstName: Joi.string().min(3).max(30).alphanum(),
        LastName: Joi.string().min(3).max(30).alphanum(),
        Username: Joi.string().min(3).max(20).required().alphanum(),
        Password: Joi.string().min(8).max(15).required(),
        Email: Joi.string().min(10).max(30).required().email(),
        Mobile: Joi.string().min(8).max(16),
        Phone: Joi.string().min(8).max(16),
      });

      const isValidate = schema.validate(payload);
      if (isValidate.error) {
        return res
          .status(400)
          .json({ message: "Invalid data", error: isValidate.error });
      }

      if (!user) {
        return res.status(404).json({
          message: "No user found",
        });
      }

      user.FirstName = req.body.FirstName;

      await user.save();

      res.json({
        user,
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
      const user_id = req.params.user_id;

      const DeletedUser = await UserModel.destroy({ where: { id: user_id } });

      if (DeletedUser === 1) {
        return res.status(200).json({
          message: "User deleted successfully",
        });
      } else {
        return res.status(404).json({
          message: "User not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
  follow: async (req, res) => {
    try {
      const followerID = req.params.followerID;
      const user_id = req.body.user_id;

      const user = await UserFollowModel.create({
        FolloweeId: user_id,
        FollowerId: followerID,
      });

      res.json({
        Message: "User followed",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
};

export default UserController;
