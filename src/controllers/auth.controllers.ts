import { Request, Response } from "express";

import { handleHttp } from "../utils/error.handle";
import { Client } from "../interface/clients.interface";
import { createNewClient } from "../services/auth.services";

const postCreateUser = async (req: Request, res: Response) => {
  try {
    const clientData: Client = req.body;
    const requiredClient = ['name', 'lastName', 'sexo', 'email', 'pass'];

    for (const property of requiredClient) {
      if (!clientData[property as keyof Client])
        return res.status(400).json({ message: `Field ${property} is required`, status: false });
    }

    const newClient = await createNewClient(clientData);

    if ('message' in newClient)
      return res.status(400).json(newClient);

    return res.status(201).json({
      status: true,
      message: 'SUCCESSFULLY_CREATE_CLIENT',
      dataClient: newClient,
    });

  } catch (e) {
    handleHttp(res, 'ERROR_POST_CREATE_CLIENT', e);
  }
};

const postLoginUser = (req: Request, res: Response) => {
  try {

  } catch (e) {
    handleHttp(res, 'ERROR_POST_LOGIN_CLIENT', e);
  }
};

export { postCreateUser, postLoginUser }; 
