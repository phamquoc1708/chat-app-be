import express, { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import cors from "cors";

import UserRoute from "./src/Routes/User.route";
import db from "./src/helpers/connecttions_mongodb";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/user", UserRoute);

app.use((req, res, next) => {
  next(createError.NotFound("Route Not Found"));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
