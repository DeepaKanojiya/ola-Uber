import mongoose from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  fullname : {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "firstname must be at least 3 character long"],
    },
    lastname: {
      type: String,
      required: true,
      minlength: [3, "lastname must be at least 3 character long"],
    }
  },
  email:{
type:String,
required : true,
unique: true, 
minlength:[5 , "email must be at least 5 character long"],
  },
  password : {
    type:String,
    required: true,
     select: false,
  },
  socketId:{
    type:String,
   
  }
})


userSchema.methods.generateAuthToken = async function () {
  const token = JWT.sign(
    { _id: this._id },
    process.env.JWT_SECRET
  );
  return token;
};


userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async  (password) =>{
  
  return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model("user", userSchema);

export default userModel;
