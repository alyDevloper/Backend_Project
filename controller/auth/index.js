import UserModel from "../../model/user/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ContactModel from "../../model/user/contact.js";

const AuthController = {
  login: async (req, res) => {
    const payload = req.body;
    const user = await UserModel.findOne({
      where: {
        Email: payload.Email,
      },
    });
    if (!user) {
      return res.status(401).json({
        message: "invalid credentional",
      });
    }
    const Hpassword = user.Password;
    const Password = payload.Password;
    const result = await bcrypt.compare(Password, Hpassword);
    console.log(result, "this is a result");

    const data = {
      id: user.id,
      Email: user.Email,
    };

    jwt.sign({ ...data }, "secret", (err, gettoken) => {
      if (err) {
        console.log(err);
        res.status.json(401)({
          message: " Internal Server Error",
        });
      } else {
        res.json({
          message: "User Logged In",
          gettoken,
        });
      }
    });
  },

  register: async (req, res) => {
    try {
      const payload = req.body;
      const saltround = 10;

      const Password = await bcrypt.hash(payload.Password, saltround);

      console.log(Password);
      const user = new UserModel();
      user.FirstName = payload.FirstName;
      user.LastName = payload.LastName;
      user.Username = payload.Username;
      user.Password = Password;
      user.Email = payload.Email;
      await user.save();

      const contact = new ContactModel();
      contact.Phone = payload.Phone;
      contact.Mobile = payload.Mobile;
      contact.UserId = user.id;
      await contact.save();

      res.json({
        message: "User Created",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
};

export default AuthController;
