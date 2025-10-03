import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
      if(error){
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
            success:false,
            message:"Access Token is Expired token use Refresh token to regenerate"
        });
      }

      return res.status(401).json({
            success:false,
            message:"Access Token is missing or invalid"
        });
    }

    const {id} = decoded;
    const user = User.findById({_id:id});
    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      })
    }

    req.userId = user._id;
    next();
    });


  } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
  }
};
