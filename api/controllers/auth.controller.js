import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, passward } = req.body;
  const hashPassward = bcryptjs.hashSync(passward, 10);
  //  const users =req.body;// same thing line number 4 and 5 and  respectivly in line number 6,7
  const newUser = new User({ username, email, passward: hashPassward });
  //  const newUser = new User (users)
  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    res.status(500).json(error.message)
  }
};
