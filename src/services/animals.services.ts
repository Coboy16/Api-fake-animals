import animalsModel from "../models/animals.models";
import { Types } from "mongoose";
import enterpriseModel from "../models/enterprises.models";
import { Animals } from "../interface/animals.interface";
import { getProfileUrl, insertProfilePhotoAnimal } from "./uploads.services";


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
    console.log();

    if (!responseNew._id)
      return { message: 'NOT_CREATE_ANIMAL' };

    const respInsertS3 = await insertProfilePhotoAnimal(file, `${responseNew._id}`);

    if (respInsertS3.status && respInsertS3.path != '') {

      const resUrl = await getProfileUrl(`${responseNew._id}`, `${file.originalname}`);
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

export { getAnimalByID, getAnimalsPage, updateAnimalId, createNewAnimal };