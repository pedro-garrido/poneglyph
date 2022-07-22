import { model, Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  rol: string;
  comparePassword: (password: string) => Promise<boolean>;
}
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ["admin", "moderator", "userSchema"],
    default: "userSchema",
  },
});

userSchema.pre<IUser>("save", async function (next) {
  const userSchema = this;
  if (!userSchema.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(userSchema.password, salt);
  userSchema.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
}


const userModel = model<IUser>("User", userSchema);

export default userModel;
