import { Request, Router } from "express";
import { akumaNoMiModel, IAkumaNoMi } from "../models/akumaNoMi.model";
import passport from "passport";

const routes = Router();

routes.get("/", async (req, res) => {
  try {
    const akumanomiList: IAkumaNoMi[] = await akumaNoMiModel.find().exec();
    return res.json(akumanomiList);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

routes.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const akumaNoMi = req.body;

      const noMiExists = await akumaNoMiModel
        .findOne({
          name: akumaNoMi.name,
        })
        .exec();

      if (noMiExists) {
        return res
          .status(409)
          .json({ error: "This akuma no mi is already register" });
      }

      const newNoMi = await akumaNoMiModel.create(akumaNoMi);
      return res.status(201).json(newNoMi);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  }
);

export default routes;
