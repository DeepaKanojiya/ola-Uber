import userModel from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import jwt from "jsonwebtoken";

// REGISTER USER
export const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

     const isUserAlreadyExist = await userModel.findOne({email});

   if(isUserAlreadyExist){
    return res.status(400).json({message:'User already exist'})
   }


    // Hash password using a static method on the model or bcrypt directly
    const hashedPassword = await userModel.hashPassword(password); // Make sure hashPassword is a static method on model

    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    const token = await user.generateAuthToken(); // make sure this returns a Promise
    res.status(201).json({ token, user });
  } catch (err) {
    next(err); // Proper error handling
  }
};

// LOGIN USER
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await user.generateAuthToken();

    res.cookie("token", token);

    res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
};

// GET USER PROFILE (Assumes middleware has added `req.user`)
export const getUserProfile = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blacklistTokenModel.create({ token });
  res.status(200).json({ message: "logged out" });
};
