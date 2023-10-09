import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
class errorHandlr extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
export const signup = async (req, res, next) => {
  const { username, email, passward } = req.body;
  const hashPassward = bcryptjs.hashSync(passward, 10);
  //  const users =req.body;// same thing line number 4 and 5 and  respectivly in line number 6,7
  const newUser = new User({ username, email, passward: hashPassward });
  //  const newUser = new User (users)
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
