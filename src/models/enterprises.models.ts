import { Schema, model } from "mongoose";

import { Enterprise } from "../interface/enterprises.interface";

const enterpriseSchema = new Schema<Enterprise>(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    hours: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const enterpiseModel = model('enterprises', enterpriseSchema);
export default enterpiseModel;