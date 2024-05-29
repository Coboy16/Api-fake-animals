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


export { createNewClient };