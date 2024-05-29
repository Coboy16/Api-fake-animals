import { Router } from "express";
import { deleteClient, getClientById, putClientById } from "../controllers/clients.controllers";

const router = Router();

router.get('/:id', getClientById);
router.put('/:id', putClientById)
router.delete('/:id', deleteClient)

export { router };