import captainModel from "../models/Captian.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import { createCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";


export const registerCaptain = async(req,res,next) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors : errors.array()});
   }
   const {fullname ,email,password,vehicle } = req.body;

   const isCaptainAlreadyExist = await captainModel.findOne({email});

   if(isCaptainAlreadyExist){
    return res.status(400).json({message:'Captain already exist'})
   }

   const hashedPassword = await captainModel.hashPassword(password);

   const captain = await createCaptain({
    firstname : fullname.firstname,
    lastname : fullname.lastname,
    email,
    password : hashedPassword,
    color:vehicle.color,
    plate:vehicle.plate,
    capacity:vehicle.capacity,
    vehicleType : vehicle.vehicleType
   })

   const token = captain.generateAuthToken();

   res.status(200).json({token , captain});
}

export const loginCaptain = async (req,res,next)=>{
   const errors = validationResult(req);;
   if(!errors.isEmpty()){
    return res.status(400).json({errors : errors.array()});
   }

   const {email,password} = req.body;

   const captain = await captainModel.findOne({email}).select('+password');

   if(!captain){
    return res.status(401).json({message:'Invalid email or password'});
   }

   const isMatch = await captain.comparePassword(password);

   if(!isMatch){
    return res.status(401).json({message:'Invalid email or password'});
   }

   const token = captain.generateAuthToken();

   res.cookie("token", token);

   res.status(200).json({token, captain});
}

export const getCaptainProfile = async (req, res, next) => {
  try {
    res.status(200).json({ captain: req.captain });
  } catch (err) {
    next(err);
  }
};


export const logoutCaptain = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Add token to blacklist
    await blacklistTokenModel.create({ token });

    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
}