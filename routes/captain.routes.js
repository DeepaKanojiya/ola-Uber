import express from "express";
import * as captainConroller from "../controllers/captain.controller.js"
import { body } from "express-validator";
import * as authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", [
  body("email").isEmail().withMessage("InValid Email"),
  body("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage("first name must be at least"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character"),
  body("vehicle.color")
    .isLength({ min: 3 })
    .withMessage("Color must be at least 3 character long"),
  body("vehicle.plate")
    .isLength({ min: 3 })
    .withMessage("Plate must be at least 3 character long"),
      body("vehicle.capacity",)
    .isLength({ min: 1 })
    .withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType",)
    .isIn(['car','motorcycle','auto'])
    .withMessage("Invalid type"),
],captainConroller.registerCaptain);


router.post("/login",[
  body('email').isEmail().withMessage("InValid Email"),
  body('password').isLength({min:6}).withMessage('Password must be at laeast 6 character')
], captainConroller.loginCaptain);


router.get("/profile", authMiddleware.authCaptain, captainConroller.getCaptainProfile);

router.get("/logout",  authMiddleware.authCaptain, captainConroller.logoutCaptain);
export default router;
