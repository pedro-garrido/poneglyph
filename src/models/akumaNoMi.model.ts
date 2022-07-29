import { model, Schema, Document } from "mongoose";

interface IAkumaNoMi extends Document {
  name: string;
  type: string;
  noMiUser: string;
  kwodedNoMiUsers: string[];
  image: string;
}

const akumaNoMi = new Schema({
  name: {
    type: String,
    unique: true,
  },
  type: {
    type: String,
    enum: ["Logia", "Paramecia", "Zoan"],
    default: "Paramecia",
  },
  noMiUser: {
    type: String,
    required: false,
  },
  kwodedNoMiUsers: {
    type: [String],
    required: false,
  },
  image: {
    type: String,
    required: false,
  }
});

const akumaNoMiModel = model<IAkumaNoMi>("AkumaNoMi", akumaNoMi);

export { akumaNoMiModel, IAkumaNoMi };
