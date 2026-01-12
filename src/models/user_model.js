import mongoose from "mongoose";

const user_schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", user_schema);

export default User;

/*
Bsically -> so users collection is created in db using user_schema (blueprint) and it is stored as User in code , is this corect ans in short

user_schema defines the structure
users is the MongoDB collection created using that structure
User is the model you use in code to access that collection 
*/
