import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../verification/verify.email.js";

export const RegisterUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "all field requires",
      });
    }

    const existingUser = await User.exists({ email: email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "email is already used",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token =  jwt.sign({id:newUser._id},process.env.SECRET_KEY,{expiresIn:"10m"})
    verifyEmail(token,email);
    newUser.token = token;
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
