import { Schema, model } from "mongoose";

import { Client } from "../interface/clients.interface";

const clientSchema = new Schema<Client>(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    sexo: { type: String, required: true, enum: ['Hombre', 'Mujer', 'Desconocido'] },
    profilePhoto: { type: String },
    email: { type: String, required: true },
    pass: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const clientModel = model<Client>('clients', clientSchema);
export default clientModel;