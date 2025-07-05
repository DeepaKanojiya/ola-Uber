import express from "express";
const router = express.Router();
import { body } from "express-validator";
import * as  userController from "../controllers/user.controller.js";


router.post("/register", [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('fullname.firstname').isLength({ min: 3 }).withMessage('Full name must be at least 3 characters long'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],
  userController.registerUser);

  
export default router;