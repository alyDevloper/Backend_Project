import jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
  const header = req.headers;

  let token = header.authorization;
  // console.log(token, "token");

  token = token.split(" ");

  token = token[1];

  try {
    const decode = jwt.verify(token, "secret");

    // Check if the token has expired

    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (decode.exp && currentTimestamp > decode.exp) {
      return res.status(401).json({
        message: "Token has expired - please login again",
      });
    }

    req.user = decode;
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token - please login again",
    });
  }

  next();
};

export default AuthMiddleware;
