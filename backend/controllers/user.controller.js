import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import { verifyEmail } from "../verification/verify.email.js";
import { Session } from "../models/session.model.js";
import { sendOtpMail } from "../verification/sendOtp.email.js";

export const RegisterUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Body is here:", req.body);
    if (!username.trim() || !email.trim() || !password.trim()) {
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
    return res.status(500).json({
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
      if (err.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "The registration token has expired ",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Token verification failed  ",
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found ",
      });
    }

    user.token = null;
    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verification successful",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//*_____________Verification methods ends here ______________//

//?-----------------------------------------------------------------//

//*_____________login controller starts here_____________________//

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are Required",
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    console.log("this is user", user);

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(402).json({
        success: false,
        message: "email or password is incorrect",
      });
    }
    //check if user is verified or not
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "verify your email then login",
      });
    }

    //check for existing session if then we will delete it

    const existingToken = await Session.findOne({ userId: user._id });
    if (existingToken) {
      await Session.deleteOne({ userId: user._id });
    }
    //creating new Session
    await Session.create({ userId: user._id });

    //creating access tokens
    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "10d",
    });
    const refreshToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "90d",
    });

    user.isLoggedIn = true;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 90 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      message: `Welcome Back ${user.username}`,
      accessToken,
      refreshToken,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//*_____________login controller ends here_____________________//

//?-----------------------------------------------------------------//

//*_____________logout controller starts here_____________________//

export const logout = async (req, res) => {
  try {
    const userId = req.userId;
    await Session.deleteMany({ userId });
    await User.findByIdAndUpdate(userId, { isLoggedIn: false });
    return res.status(200).json({
      success: true,
      message: "User Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//*_____________logout controller ends here_____________________//

//?-----------------------------------------------------------------//

//*_____________Forgot Password  controller starts here_____________________//

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);
    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();

    await sendOtpMail(email, otp);

    return res.status(200).json({
      success: true,
      message: "otp send successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//*_____________Forgot Password  controller ends here_____________________//

export const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const email = req.params.email;
  if (!otp) {
    return res.status(400).json({
      success: false,
      message: "Otp is required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Could not found user with given email",
      });
    }

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        message: false,
        message: "OTP not generated all already verified",
      });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Otp has been expired please generate new one",
      });
    }

    if (otp != user.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "otp verified successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const email = req.params.email;

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "All field are required",
    });
  }

  if (newPassword != confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password do not match",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getCurrentUser = async(req,res) =>{
  console.log("accessing the getrequrest");
  try {
    const user = await User.findById(req.userId);

    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      })
    }
   return res.status(200).json({
      success:true,
      message:"User found",
      user
    })
  } catch (error) {
    console.log("traped in catch")
   return res.status(500).json({ success: false, message: error.message });
  }
};