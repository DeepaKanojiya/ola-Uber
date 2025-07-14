import express from "express";
import cors from "cors";
import db from "./db/db.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js"



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
app.use("/captains",captainRoutes)

app.listen(port, () => {
  console.log("server is running port " + port);
});
