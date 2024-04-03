import Express, { json } from "express";
import { connectdb } from "./db/config.js";
import initdb from "./db/init.js";
import UserRouter from "./router/user/index.js";
import PostRouter from "./router/post/index.js";
import authRoutes from "./router/auth/index.js";
import EmailRoutes from "./router/email/index.js";
import ImageRoutes from "./router/upload/index.js";

const app = Express();
const port = 3304;

connectdb();
app.use(json());
initdb().then(() => {
  console.log("Db Synced.");
});

app.use(UserRouter);
app.use(PostRouter);
app.use(authRoutes);
app.use(EmailRoutes);
app.use(ImageRoutes);

app.listen(port, () => {
  console.log("Server started successfully.");
});
