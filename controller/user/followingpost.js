import PostModel from "../../model/post/index.js";
import UserFollowModel from "../../model/user/userfollow.js";

const FollowingPostController = {
  Getposts: async (req, res) => {
    try {
      const follower_id = req.params.follower_id;

      const getfollowingjsonarray = await UserFollowModel.findAll({
        where: {
          FollowerId: follower_id,
        },
      });
      let changetonumarray = getfollowingjsonarray.map((ele) => ele.FolloweeId);

      const getfollowingpost = await PostModel.findAll({
        where: {
          id: changetonumarray,
        },
      });

      res.json({
        message: "fetching record against user follower id",
        getfollowingpost,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something bad happened to server",
        error,
      });
    }
  },
};

export default FollowingPostController;
