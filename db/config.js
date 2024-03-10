import { Sequelize } from "sequelize";

const sequelize = new Sequelize("prince_db", "postgres", "postgre@6570b", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: false,
});

const connectdb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { connectdb };
export default sequelize;
