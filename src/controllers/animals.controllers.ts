import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { getAllDogsPage, getAnimalByID } from "../services/animals.services";

const getDogsPage = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.params.page, 10);

    if (isNaN(page) || page < 1)
      return res.status(400).json({ message: 'IVALID_PAGE_NUMBER' });

    const dogs = await getAllDogsPage(page);

    if ('message' in dogs)
      return res.status(404).json(dogs);

    return res.status(200).json(dogs);

  } catch (e) {
    handleHttp(res, 'ERROR_GET_DOGS', e);
  }
};

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

const getCats = async (req: Request, res: Response) => {
  try {
    res.send('CATS');
  } catch (e) {
    handleHttp(res, 'ERROR_GET_CATS', e);
  }
};

const getBunny = (req: Request, res: Response) => {
  try {
    res.send('BUNNY');
  } catch (e) {
    handleHttp(res, 'ERROR_GET_CATS', e);
  }
};

export { getDogsPage, getAnimalId };