import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import config from "../config/config";

function getToken(user: IUser): string {
  return jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, {
    expiresIn: "1d",
  });
}

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ error: "Please provide an email and a password" });
  } else if (!req.body.email.includes("@")) {
    return res.status(400).json({ error: "Please provide a valid email" });
  } else if (req.body.password.length < 6) {
    return res
      .status(400)
      .json({ error: "Please provide a password with at least 6 characters" });
  }
  const newUser = new User(req.body);
  await newUser.save();
  return res.status(201).json({ message: "User created successfully" });
};

export const signIn = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ error: "Please provide an email and a password" });
  } else if (!req.body.email.includes("@")) {
    return res.status(400).json({ error: "Please provide a valid email" });
  } else if (req.body.password.length < 6) {
    return res
      .status(400)
      .json({ error: "Please provide a password with at least 6 characters" });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "This email is not registered" });
  }

  const match = await user.comparePassword(req.body.password);
  if (match) {
    return res.status(200).json({ token: getToken(user) });
  } else {
    return res.status(400).json({ error: "Invalid password" });
  }
};
