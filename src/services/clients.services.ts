import { Types } from "mongoose";

import clientModel from "../models/clients.models";
import { Client } from "../interface/clients.interface";

const getInfoClientByID = async (clientId: string) => {
  if (!Types.ObjectId.isValid(clientId))
    return { message: 'INVALID_ID' };

  const getClient = await clientModel.findById(clientId)
    .select('-createdAt -updatedAt -pass');

  if (!getClient)
    return { status: false, message: 'CLIENT_NOT_FOUND' };

  return getClient;
};
const deleteClientByID = async (clientId: string) => {
  if (!Types.ObjectId.isValid(clientId))
    return { message: 'INVALID_ID' };

  const resDelete = await clientModel.deleteOne({ _id: clientId });

  if (resDelete.deletedCount === 1)
    return { status: true, message: 'CLIENTE_ELIMINATE_SUSSEFULLY' };
  else
    return { status: false, message: 'CLIENT_NOT_FOUND' };
};


const updateClientByID = async (clientId: string, updateData: Partial<Client>) => {
  if (!Types.ObjectId.isValid(clientId))
    return { message: 'INVALID_ID' };

  const updateClient = await clientModel.findByIdAndUpdate(clientId,
    { $set: updateData }, { new: true, runValidators: true }).select('-createdAt -updatedAt -pass');

  if (!updateClient)
    return { status: false, message: 'CLIENT_NOT_FOUND' };

  return updateClient;
};

export { getInfoClientByID, updateClientByID, deleteClientByID };