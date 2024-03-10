import PostModel from "../model/post/index.js";
import CommentModel from "../model/post/comment.js";
import LikesModel from "../model/post/like.js";
import UserModel from "../model/user/index.js";
import ContactModel from "../model/user/contact.js";
import UserFollowModel from "../model/user/userfollow.js";
import ImageModel from "../model/upload/index.js";

const initdb = async () => {
  await UserModel.sync({
    alter: true,
    force: false,
  });
  await ContactModel.sync({
    alter: true,
    force: false,
  });
  await PostModel.sync({
    alter: true,
    force: false,
  });
  await LikesModel.sync({
    alter: true,
    force: false,
  });
  await CommentModel.sync({
    alter: true,
    force: false,
  });
  await UserFollowModel.sync({
    alter: true,
    force: false,
  });
  await ImageModel.sync({
    alter: true,
    force: false,
  });
};

export default initdb;
