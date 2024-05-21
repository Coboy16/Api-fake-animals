import { Request, Response, Router } from "express";
import { getAnimalId, getBunnies, getCats, getDogsPage } from "../controllers/animals.controllers";

const router = Router();

router.get('/dogs/:page', getDogsPage);
router.get('/cats/:page', getCats);
router.get('/bunnies/:page', getBunnies);
router.get('/birds/:page', getBunnies);
router.get('/mouses/:page', getBunnies);

router.get('/:id', getAnimalId);

export { router };