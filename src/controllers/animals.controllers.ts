import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

const getDogs = async (req: Request, res: Response) => {
  try {
    res.send('DOGS');
  } catch (e) {
    handleHttp(res, 'ERROR_GET_DOGS', e);
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

export { getDogs };