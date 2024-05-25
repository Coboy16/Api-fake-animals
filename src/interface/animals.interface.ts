import { Schema } from "mongoose";

export interface Animals {
  name: string;
  race: string;
  sexo: 'Macho' | 'Hembra';
  age: number;
  vacunate: boolean;
  description: string;
  weight: number;
  profilePhoto: string;
  photos: Array<string>;
  type: 'dogs' | 'cats' | 'bunny' | 'rabiots' | 'mouses';
  enterpriseId: Schema.Types.ObjectId;

};