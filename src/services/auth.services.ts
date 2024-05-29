import { Types } from "mongoose";
import { Client } from "../interface/clients.interface";
import clientModel from "../models/clients.models";
import { encrypPass } from "../utils/bcrypt.handdle";

const createNewClient = async ({ name, lastName, sexo, email, pass }: Client,) => {
  try {
    const checkIs = await clientModel.findOne({ email });
    if (checkIs)
      return { status: false, message: 'CLIENT_IT_ALREADY_EXISTS' }

    const passHash = await encrypPass(pass);
    const newClient = await clientModel.create({ name, lastName, profilePhoto: 'NOT_PHOTO', sexo, email, pass: passHash });
    return newClient;
  } catch (e) {
    console.log('ERROR_CREATE_CLIENT', e);
    throw e;
  }
};

const updateClientId = async (clientId: string, updateData: Partial<Client>) => {
  if (!Types.ObjectId.isValid(clientId))
    return { message: 'INVALID_ID' };

  const updateClient = await clientModel.findByIdAndUpdate(clientId,
    { $set: updateData }, { new: true, runValidators: true });

  if (!updateClient)
    return { message: 'ANIMAL_NOT_FOUND' };

  return updateClient;
};

export { createNewClient, updateClientId };