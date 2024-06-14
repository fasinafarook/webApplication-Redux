import express from "express";
const adminRouter = express.Router();
import {
  authAdmin,
  logoutAdmin,
  getUsers,
  getSingleUser,
  updateUserDetails,
  deleteUser,
  addUser,
} from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import { adminProtect } from "../middleware/adminAuthMiddleware.js";

adminRouter.post("/", authAdmin);
adminRouter.post("/logout", logoutAdmin);

adminRouter.route("/users").get(adminProtect, getUsers);
adminRouter.get("/single-user", adminProtect, getSingleUser);
adminRouter.post(
  "/update-user",
  adminProtect,
  upload.single("image"),
  updateUserDetails
);


adminRouter.delete("/delete-user", adminProtect, deleteUser);
adminRouter.post("/add-user", adminProtect, upload.single("image"), addUser);

export default adminRouter;
