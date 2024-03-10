import ImageModel from "../../model/upload/index.js";

const ImageController = {
  uploadImage: async (req, res) => {
    try {
      const { originalname, size, buffer } = req.file;

      await ImageModel.create({ filename: originalname, size, data: buffer });

      res.json({ filename: originalname, size });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something bad happened to server",
      });
    }
  },
};
export default ImageController;
