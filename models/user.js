import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    require: true,
  },
  fullname: {
    type: String,
    require: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
    next();
  } catch (error) {
    console.log(error);
    throw new Error("Falló el hash de contraseña");
  }
});

userSchema.methods.comparePassword = async function (providedPassword) {
  return await bcryptjs.compare(providedPassword, this.password);
};

export const User = mongoose.model("user", userSchema);
