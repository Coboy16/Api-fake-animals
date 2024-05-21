import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { insertProfilePhotoAnimal } from "../services/uploads.services";


const upProfilePhotoAnimal = async (req: Request, res: Response) => {
  try {
    if (!req.file)
      return res.status(400).send({ message: 'NOT_FILE_UPLOAD' });

    const animalId = req.params.id;
    const fileData = await insertProfilePhotoAnimal(req.file, animalId);

    if ('message' in fileData)
      return res.status(400).send(fileData);

    res.status(200).json(fileData);
  } catch (e) {
    handleHttp(res, 'ERROR_UPLOAD_PROFILE_PHOTO', e);
  }
};

export { upProfilePhotoAnimal };