import { Request, Response } from "express";
import { akumaNoMiModel } from "../models/akumaNoMi.model";


export const saveFruit = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.name || !req.body.type) {
    return res.status(400).json({ error: "Please provide a name and a type" });
  } else if (req.body.name.length < 3) {
    return res
      .status(400)
      .json({ error: "Please provide a name with at least 3 characters" });
  } else {
    const newFruit = {
      name: req.body.name,
      type: req.body.type,
      noMiUser: req.body.noMiUser,
      kwodedNoMiUsers: req.body.kwodedNoMiUsers,
      image: req.file.path,
    };
    const fruit = await akumaNoMiModel.create(newFruit);
    return res
      .status(201)
      .json({ message: "Fruit created successfully", fruit });
  }
};

export const getFruit = async (req: Request, res: Response) => {
  

  console.log(Object.keys(req.query).length === 0);

  if (Object.keys(req.query).length === 0) {
    const fruits = await akumaNoMiModel.find();
    return res.status(200).json(fruits);
  } else if (req.query.name) {
    const { name } = req.query;
    const fruit = await akumaNoMiModel.findOne({ name: name.toString() });
    fruit ? res.status(200).json(fruit) : res.status(404).json({ error: "Fruit not found" });
  } else {
    return res.status(400).json({ error: "Not handled parameter" });
  }
};


