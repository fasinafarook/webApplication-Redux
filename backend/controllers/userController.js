import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import { cloudinary } from "../config/cloudinary.js";

//@desc Auth user/set token
//route POST /api/users/auth
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id, "userJWT");
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Register  a new user
//route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id, "userJWT");
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Logout user
//route POST /api/users/logout
//@access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("userJWT", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

//@desc Get user profile
//route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    imageUrl: req.user.imageUrl,
  };

  res.status(200).json(user);
});

//@desc Update user profile
//route PUT /api/users/profile
//@access Public
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const isPasswordCorrect = await user.matchPassword(
      req.body.currentPassword
    );
    if (!isPasswordCorrect) {
      console.log("matchPassword error");
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.file) {
      try {
        if (user.imageUrl) {
          console.log(user.imageUrl);
          const publicId = user.imageUrl.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }
        const res = await cloudinary.uploader.upload(req.file.path);
        user.imageUrl = res.secure_url;
      } catch (err) {
        console.log("Error uploading to cloudinary");
        return res
          .status(400)
          .json({ error: "Image upload to cloudinary failed" });
      }
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      imageUrl: updatedUser.imageUrl,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({ message: "Update user profile" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
