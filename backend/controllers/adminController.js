import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import { cloudinary } from "../config/cloudinary.js";


const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email });

  if (admin && admin.isAdmin && (await admin.matchPassword(password))) {
    generateToken(res, admin._id, "adminJWT");
    res
      .status(201)
      .json({ _id: admin._id, name: admin.name, email: admin.email });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});


const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("adminJWT", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Admin logged out" });
  
});


const getUsers = asyncHandler(async (req, res) => {
  const userData = await User.find({ isAdmin: false })
    .select("-password")
    .sort({ updatedAt: -1 });

  res.status(200).json(userData);
});


const getSingleUser = asyncHandler(async (req, res) => {
  const { userId } = req.query;

  const userData = await User.findOne({ _id: userId }).select("-password");
  return res.status(200).json(userData);
});



const updateUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userId);


  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.file) {
      try {
        if (user.imageUrl) {
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

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.query.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (user.imageUrl) {
      const publicId = user.imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  const user = new User({
    name,
    email,
    password,
  });

  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      user.imageUrl = result.secure_url;
    } catch (err) {
      console.error("Error uploading image to Cloudinary:", err);
      return res.status(400).json({ error: "Image upload failed" });
    }
  }

  try {
    const savedUser = await user.save();
    res.status(201).json({ success: true });
  } catch (err) {
    console.error("Error saving user to the database:", err);
    res.status(400).json({ error: "Failed to create user" });
  }
});

export {
  authAdmin,
  logoutAdmin,
  getUsers,
  getSingleUser,
  updateUserDetails,
  deleteUser,
  addUser,
};
