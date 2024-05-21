import { Router } from "express";

import { upProfilePhotoAnimal } from "../controllers/uploads.controllers";
import { upload } from "../middleware/file.middleware";


const router = Router();

router.post('/photo/:id', upload.single('myFile'), upProfilePhotoAnimal);

export { router };