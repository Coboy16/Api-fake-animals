import { Router } from "express";

import { getPhotoProfileInfo, getPhotoProfileUrl, upProfilePhotoAnimal } from "../controllers/uploads.controllers";
import { upload } from "../middleware/file.middleware";


const router = Router();

router.post('/photo/:id', upload.single('myFile'), upProfilePhotoAnimal);
router.get('/getphoto/:id/:fileName', getPhotoProfileInfo);
router.get('/getphotourl/:id/:fileName', getPhotoProfileUrl);

export { router };