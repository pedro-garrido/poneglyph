import { Request, Router } from "express";
import { akumaNoMiModel, IAkumaNoMi } from "../models/akumaNoMi.model";
import passport from "passport";
import { getFruit, saveFruit } from "../controllers/akumaNoMi.controller";
import multer from "../lib/multer";

const routes = Router();

routes.get("/", getFruit);

routes.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  multer.single("image"),
  saveFruit
);

export default routes;
