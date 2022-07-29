import { Router } from "express";
import { signIn, signUp } from "../controllers/user.controller";
import passport from "passport";
const router = Router();

router.post(
  "/signup",
  passport.authenticate("jwt", { session: false }),
  signUp
);

router.post("/signin", signIn);

export default router;
