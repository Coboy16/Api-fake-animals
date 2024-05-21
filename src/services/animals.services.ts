import animalsModel from "../models/animals.models";
import { Types } from "mongoose";
import enterpriseModel from "../models/enterprises.models";


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
    return { messge: 'INVALID_ID' };

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

export { getAnimalByID, getAnimalsPage };