import mongoose from "mongoose";
import { Schema } from "mongoose";

const sessionSchema = Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

export const Session = mongoose.model("Session", sessionSchema);
