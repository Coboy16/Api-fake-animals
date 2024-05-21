import { Schema } from "mongoose";

export interface Uploads {
  fileName: string;
  path: string;
  animalsId: Schema.Types.ObjectId;
};