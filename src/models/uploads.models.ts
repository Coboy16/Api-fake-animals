import { Schema } from "mongoose";
import { Uploads } from "../interface/uploads.interface";

const uploadsSchema = new Schema<Uploads>(
  {
    fileName: { type: String, required: true },
    path: { type: String, required: true },
    animalsId: { type: Schema.Types.ObjectId, required: true },
  }
);

export default uploadsSchema;