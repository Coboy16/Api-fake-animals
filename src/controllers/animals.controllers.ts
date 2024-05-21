import { Request, Response } from "express";

import { handleHttp } from "../utils/error.handle";
import { getAnimalByID } from "../services/animals.services";
import { animalsResponse } from "../utils/animals.handdle";

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

export { getDogsPage, getCats, getBunnies, getBirds, getMouses, getAnimalId };