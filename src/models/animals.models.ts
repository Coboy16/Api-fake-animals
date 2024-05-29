import { Schema, model } from "mongoose";

import { Animals } from "../interface/animals.interface";

const animalsSchema = new Schema<Animals>(
  {
    name: { type: String, required: true },
    race: { type: String, required: true },
    sexo: {
      type: String,
      enum: ['Macho', 'Hembra'],
      required: true,
    },
    age: { type: Number, required: true },
    vacunate: { type: Boolean, required: true },
    description: { type: String, required: true },
    weight: { type: Number, required: true },
    profilePhoto: { type: String, required: true },
    photos: { type: [String] },
    type: {
      type: String,
      enum: ['dogs', 'cats', 'bunny', 'rabiots', 'mouses'],
      required: true,
    },
    enterpriseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'enterprises',
    },
  },
  { timestamps: true, versionKey: false }
);

const animalsModel = model<Animals>('animals', animalsSchema);
export default animalsModel;