import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      requried: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1712733823~exp=1712734423~hmac=0562955979c16cd3c155f2feddc30fa40c0f666ab7181a96c3c7171bd51c6429",
    },
  },
  { timestamps: true }
);




//"This" means the user that is being created or updated
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPasword) {
  return await bcrypt.compare(enteredPasword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
