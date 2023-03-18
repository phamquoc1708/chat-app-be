import express, { NextFunction } from "express";

import { UserController } from "../Controllers/user/user.controller";
import { UserService } from "../Services/User.service";

const route = express.Router();

const userService = new UserService();
const userController = new UserController(userService);

route.post("/register", userController.register());

route.post("/login", (req, res) => {
  res.send("Login");
});

route.post("/refresh-token", (req, res) => {
  res.send("Refresh Token");
});

route.post("/logout", (req, res) => {
  res.send("Logout");
});

export default route;
