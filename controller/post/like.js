import LikesModel from "../../model/post/like.js";


const LikesController = {
    like : async (req,res)=>{
        try{
            const post_id = req.params.post_id;

            await LikesModel.increment('Likes', {by:1, where:{UserPostId:post_id}});

            res.json({
                message:"Liked the post"
            })

        }catch(error){
            res.status(500).json({
                message: "Something bad happened to server",
            });
        }
    },
    dislike : async (req,res)=>{
        try{
            const dislike_id = req.params.post_id;

            await LikesModel.increment('DisLikes', {by:1, where:{UserPostId:dislike_id}});

            res.json({
                message:"DisLiked the post"
            })

        }catch(error){
            res.status(500).json({
                message: "Something bad happened to server",
            });
        }
    }
};

export default LikesController;