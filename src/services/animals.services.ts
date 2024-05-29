import { Types } from "mongoose";

import animalsModel from "../models/animals.models";
import enterpriseModel from "../models/enterprises.models";
import { Animals } from "../interface/animals.interface";
import { getDataUrlGlobal, insertPhotoPerfilGlobal } from "./uploads.services";

//Retorna los 6 primeros documentos, dependiendo al numero de pagina
const getAnimalsPage = async (page: number, animals: string) => {
  const limit = 6;
  const skip = (page - 1) * limit;

  const listAnimals = await animalsModel.find({ type: animals })
    .select('_id name race profilePhoto')
    .skip(skip)
    .limit(limit);

  if (listAnimals.length === 0)
    return { message: 'NO_DOCUMENTS' };

  return listAnimals;
};

//Retorna la informacion de una animal con su id
const getAnimalByID = async (id: string) => {
  if (!Types.ObjectId.isValid(id))
    return { message: 'INVALID_ID' };

  const animal = await animalsModel.findById(id)
    .select('-type')
    .populate({
      path: 'enterpriseId',
      select: 'address',
      model: enterpriseModel,
    });

  if (!animal)
    return { message: 'NO_ANIMAL_FOUND' }

  return animal;
};

//actualiza un las propiedades de un animal
const updateAnimalId = async (animalId: string, updateData: Partial<Animals>) => {
  if (!Types.ObjectId.isValid(animalId))
    return { message: 'INVALID_ID' };

  const updateAnimal = await animalsModel.findByIdAndUpdate(animalId,
    { $set: updateData }, { new: true, runValidators: true });

  if (!updateAnimal)
    return { message: 'ANIMAL_NOT_FOUND' };

  return updateAnimal;
}

//crea un nuevo animnal con su foto de perfil guarada en S3
const createNewAnimal = async (file: Express.Multer.File, animal: Animals) => {
  try {
    const responseNew = await animalsModel.create(animal);

    if (!responseNew._id)
      return { message: 'NOT_CREATE_ANIMAL' };

    const respInsertS3 = await insertPhotoPerfilGlobal(file, `${responseNew._id}`, 1, true);

    if (respInsertS3.status && respInsertS3.path != '') {

      const resUrl = await getDataUrlGlobal(`${responseNew._id}`, `${file.originalname}`, 1, true);
      const updateData = { "profilePhoto": resUrl.urlProfile };
      const updateAnimal = await updateAnimalId(`${responseNew._id}`, updateData);

      return updateAnimal;
    } else
      return { message: 'NO_INSERT_PHOTO_S3' };
  } catch (e) {
    console.log('ERROR_CREATE_ANIMAL', e);
    throw e;
  }
};

//sube multiples fotos a S3
const updatePhotosAnimal = async (files: Express.Multer.File[], animalId: string) => {
  if (!Types.ObjectId.isValid(animalId))
    return { status: false, message: 'INVALID_ID' };

  const updloadPromise = files.map(file => insertPhotoPerfilGlobal(file, animalId, 1, false));
  const response = await Promise.all(updloadPromise);
  const resUploadPhotos = response.filter(resp => resp.status);

  if (resUploadPhotos.length === 0)
    return { status: false, message: 'NO_INSERT_PHOTO_S3' };

  const uplaodsUrls = files.map(fileName => getDataUrlGlobal(animalId, fileName.originalname, 1, false));
  const reponseUrls = await Promise.all(uplaodsUrls);
  const photosUrlObjet = reponseUrls.filter(photoUrl => photoUrl.urlProfile);

  if (photosUrlObjet.length === 0)
    return { status: false, message: 'NO_GENERATE_URL_S3' };

  //Convertimos el array de objetos a un array de string
  const arrayPhotosUrl: string[] = photosUrlObjet.map(photoUrlObj => photoUrlObj.urlProfile);
  const updateDataAnimal = { photos: arrayPhotosUrl };
  return await updateAnimalId(animalId, updateDataAnimal);
};

export { getAnimalByID, getAnimalsPage, updateAnimalId, createNewAnimal, updatePhotosAnimal };