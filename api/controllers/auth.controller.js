import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
class errorHandlr extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}
export const signup = async (req, res, next) => {
  const { username, email, passward } = req.body;
  const hashPassward = bcryptjs.hashSync(passward, 10);
  //  const users =req.body;// same thing line number 4 and 5 and  respectivly in line number 6,7
  const newUser = new User({ username, email, passward: hashPassward });
  //  const newUser = new User (users)//this is same but the passward is differnent
  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    return next(new errorHandlr("new custom error", 550));

    // console.log(error);
    //   console.log(error);
    // next(error);

    // console.log(error)
    // res.status(500).json(error.message)
    // next(errorHandler(550, "custom error"));
    // console.log(errorHandler(505, "new error"));
  }
};

export const signin = async (req, res, next) => {
  const { email, passward } = req.body;
  try {
    const validUser = await User.findOne({ email });
    // const validUser
    if (!validUser) return next(errorHandler(404, "user not found"));
    const validPassward = bcryptjs.compareSync(passward, validUser.passward);
    if (!validPassward) return next(errorHandler(401, "wrong credential"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { passward: pass, ...restInfo } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(validUser);
  } catch (error) {
    next(error);
  }
};


export const google = async (req ,res , next)=>{
  try {
    const user = await User.findOne({email:req.body.email})
    if(user){
    const token =  jwt.sign({id : user._id}, process.env.JWT_SECRET)
    const {passward:pass , ...rest} = user._doc;
    res.cookie('access_token' , token , {httpOnly:true}).status(200).json(rest)
    }else{
      const generatePassward = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashPassward = bcryptjs.hashSync(generatePassward, 10);
      const newUser = new User({username:req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email ,passward:hashPassward , avatar:req.body.photo })
      await newUser.save();
      const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
      const {passward:pass, ...rest} = newUser._doc;
      res.cookie('access_token' , token , {httpOnly:true}).status(200).json(rest); 
    }
  } catch (error) {
    next(error)
  }
}