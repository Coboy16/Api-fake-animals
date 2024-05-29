import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { getDataUrlGlobal, getProfileInfo, insertPhotoPerfilGlobal, } from "../services/uploads.services";


const upProfilePhotoAnimal = async (req: Request, res: Response) => {
  try {
    if (!req.file)
      return res.status(400).send({ message: 'NOT_FILE_UPLOAD' });

    const animalId = req.params.id;
    const fileData = await insertPhotoPerfilGlobal(req.file, animalId, 1, true);

    if ('message' in fileData)
      return res.status(400).send(fileData);

    return res.status(200).json(fileData);
  } catch (e) {
    handleHttp(res, 'ERROR_UPLOAD_PROFILE_PHOTO', e);
  }
};

const getPhotoProfileInfo = async (req: Request, res: Response) => {
  try {
    const animalId = req.params.id;
    const fileName = req.params.fileName;

    const fileData = await getProfileInfo(animalId, fileName);

    if ('message' in fileData)
      return res.status(400).send(fileData);

    return res.status(200).json({ fileData });
  } catch (e) {
    handleHttp(res, 'ERROR_GET_INFO_PHOTO', e);
  }
};

const getPhotoProfileUrl = async (req: Request, res: Response) => {
  try {
    const animalId = req.params.id;
    const fileName = req.params.fileName;
    const infoUrl = await getDataUrlGlobal(animalId, fileName, 1, true);
    res.status(200).json(infoUrl);
  } catch (e) {
    handleHttp(res, 'ERROR_UPLOAD_PROFILE_PHOTO', e);
  }
};
export { upProfilePhotoAnimal, getPhotoProfileInfo, getPhotoProfileUrl };