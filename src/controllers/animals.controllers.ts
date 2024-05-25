import { Request, Response } from "express";

import { handleHttp } from "../utils/error.handle";
import { getAnimalByID, createNewAnimal, updateAnimalId } from "../services/animals.services";
import { animalsResponse } from "../utils/animals.handdle";
import { Animals } from "../interface/animals.interface";

const getDogsPage = (req: Request, res: Response) => animalsResponse(req, res, 'dogs');

const getCats = (req: Request, res: Response) => animalsResponse(req, res, 'cats');

const getBunnies = (req: Request, res: Response) => animalsResponse(req, res, 'bunnies');

const getBirds = (req: Request, res: Response) => animalsResponse(req, res, 'birds');

const getMouses = (req: Request, res: Response) => animalsResponse(req, res, 'mouses');

const getAnimalId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const animal = await getAnimalByID(id);

    if ('message' in animal) {
      if (animal.message === 'NO_ANIMAL_FOUND')
        return res.status(400).json(animal);

      return res.status(404).json(animal);
    }

    res.status(200).json(animal);
  } catch (e) {
    handleHttp(res, 'ERROR_GET_DOG_ID', e);
  }
};

const putUpdateAnimal = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const updateAnimal = await updateAnimalId(id, updateData);

    if ('message' in updateAnimal)
      return res.status(400).json(updateAnimal);

    return res.status(200).json(updateAnimal);
  } catch (e) {
    handleHttp(res, 'ERROR_UPDATE_ANIMAL', e);
  }

};


const postCreateAnimal = async (req: Request, res: Response) => {
  try {
    if (!req.file)
      return res.status(400).send({ message: 'NOT_FILE_UPLOAD' });

    const data = req.body.data;
    const animalData: Animals = JSON.parse(data);
    // const animalData: Animals = req.body;

    const requiredFields = [
      'name', 'race', 'sexo', 'age', 'vacunate', 'description',
      'weight', 'profilePhoto', 'type', 'enterpriseId'
    ];

    for (const field of requiredFields) {
      if (!animalData[field as keyof Animals])
        return res.status(400).json({ message: `Field ${field} is required`, status: false });
    }

    const newAnimal = await createNewAnimal(req.file, animalData);

    if ('message' in newAnimal)
      return res.status(400).json(newAnimal);

    return res.status(201).json({
      message: 'SUCCESSFULLY_CREATE_ANIMAL',
      status: true,
      dataAnimal: newAnimal,
    });

  } catch (e) {
    handleHttp(res, 'ERROR_CREATE_ANIMAL', e);
  }
};

const postUpdateAnimal = async (req: Request, res: Response) => {

};

export { getDogsPage, getCats, getBunnies, getBirds, getMouses, getAnimalId, putUpdateAnimal, postCreateAnimal };