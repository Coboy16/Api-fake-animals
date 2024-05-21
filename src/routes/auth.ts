import { Router } from "express";

const router = Router();

router.post('/clients/create');
router.post('/clients/:id');

export { router };