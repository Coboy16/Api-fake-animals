import { Schema } from "mongoose";

export interface Animals {
  name: string;
  race: string;
  sexo: 'Macho' | 'Hembra';
  age: number;
  vacunate: boolean;
  decription: string;
  weight: number;
  porfilePhoto: string;
  photos: Array<string>;
  type: 'dogs' | 'cats' | 'bunny' | 'rabiots' | 'mouses';
  enterpriseId: Schema.Types.ObjectId;
  address: string;
};