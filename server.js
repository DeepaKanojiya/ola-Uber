import express from "express";
import cors from "cors";
import db from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3000;
db();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("hello world!");
});

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log("server is running port " + port);
});
