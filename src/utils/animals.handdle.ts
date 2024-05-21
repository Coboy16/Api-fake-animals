import { Request, Response } from "express";
import { getAnimalsPage } from "../services/animals.services";
import { handleHttp } from "./error.handle";

const animalsResponse = async (req: Request, res: Response, nameListAnimals: string) => {
  try {
    const page = parseInt(req.params.page, 10);

    if (isNaN(page) || page < 1)
      return res.status(400).json({ message: 'IVALID_PAGE_NUMBER' });

    const animals = await getAnimalsPage(page, nameListAnimals);

    if ('message' in animals)
      return res.status(404).json(animals);

    return res.status(200).json(animals);
  } catch (e) {
    handleHttp(res, `ERROR_GET_${toUpperCase(nameListAnimals)}`, e);
  }
};

//Retorna la palabra en mayuscula
const toUpperCase = (input: string): string => {
  return input.toUpperCase();
};

export { animalsResponse };