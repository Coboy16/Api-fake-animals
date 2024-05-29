import { Router } from "express";
import { deleteClient, getClientById, putClientById, updatePhotoById } from "../controllers/clients.controllers";
import { upload } from "../middleware/file.middleware";

const router = Router();

router.get('/:id', getClientById);
router.put('/:id', putClientById);
router.delete('/:id', deleteClient);
router.put('/update-photo/:id', upload.single('myPerfilPhoto'), updatePhotoById);

export { router };