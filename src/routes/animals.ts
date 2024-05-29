import { Router } from "express";
import { getAnimalId, getBunnies, getCats, getDogsPage, postCreateAnimal, postUpMultiplePhotos, putUpdateAnimal } from "../controllers/animals.controllers";
import { upload } from "../middleware/file.middleware";

const router = Router();

router.get('/dogs/:page', getDogsPage);
router.get('/cats/:page', getCats);
router.get('/bunnies/:page', getBunnies);
router.get('/birds/:page', getBunnies);
router.get('/mouses/:page', getBunnies);

router.get('/:id', getAnimalId);

router.put('/update/:id', putUpdateAnimal);
router.post('/create', upload.single('myProfilePhoto'), postCreateAnimal);
router.put('/multiple-photos/:id', upload.array('myPhotos', 5), postUpMultiplePhotos);

export { router };