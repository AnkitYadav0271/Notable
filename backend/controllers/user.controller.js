import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
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
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    verifyEmail(token, email);
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

//*______________verification method starts here__________________//

export const verification = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization is failed due to missing token",
      });
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      if (err.name ==="TokenExpiredError" ){
        return res.status(400).json({
          success:false,
          message:"The registration token has expired "
        });

        return res.status(400).json({
          success:false,
          message:"Token verification failed  "
        })
      } 
    }

    const user = await User.findById(decoded.id);
    if(!user){
      res.status(404).json({
        success:false,
        message:"User not found "
      });
    };

    user.token = null;
    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      success:true,
      message:"Email verification successful"
    })
    console.log("decoded at userController verification",decoded);
    console.log("user at userController verification",user);
  } catch (error) {
    return res.status(400).json({
      success:false,
      message:error.message, 
    })
  }
};

//*_____________Verification methods ends here ______________//