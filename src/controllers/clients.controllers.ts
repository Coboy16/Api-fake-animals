import { Request, Response } from "express";

import { handleHttp } from "../utils/error.handle";
import { deleteClientByID, getInfoClientByID, updateClientByID, updatePhotoProfileByID } from "../services/clients.services";

const updatePhotoById = async (req: Request, res: Response) => {
  try {
    if (!req.file)
      return res.status(400).send({ message: 'NOT_FILE_UPLOAD' });

    const id = req.params.id;
    const repstPhoto = await updatePhotoProfileByID(req.file, id);

    if ('message' in repstPhoto)
      return res.status(400).json(repstPhoto);

    return res.status(201).json({ status: true, urlPhotoData: repstPhoto });
  } catch (e) {
    handleHttp(res, 'ERROR_UPDATE_PROFILE_PHOTO', e);
  }
};

const getClientById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const client = await getInfoClientByID(id);

    if ('message' in client) {
      if (client.message === 'CLIENT_NOT_FOUND')
        return res.status(400).json(client);

      return res.status(404).json(client);
    }

    return res.status(200).json({ status: true, dataClient: client });
  } catch (e) {
    handleHttp(res, 'ERROR_GET_CLIENT_ID', e);
  }
};

const putClientById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const updateClient = await updateClientByID(id, updateData);

    if ('message' in updateClient)
      return res.status(400).json(updateClient);

    return res.status(200).json({ status: true, dataClientUpdate: updateClient });
  } catch (e) {
    handleHttp(res, 'ERROR_PUT_CLIENT_ID', e);
  }
};

const deleteClient = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const resDelete = await deleteClientByID(id);

    if ('message' in resDelete)
      return res.status(400).json(resDelete);

    return res.status(200).json(resDelete);
  } catch (e) {
    handleHttp(res, 'ERROR_DELETE_CLIENT_ID', e);
  }
};

export { getClientById, putClientById, deleteClient, updatePhotoById };