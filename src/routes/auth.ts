import { Router } from "express";

import { postCreateUser } from "../controllers/auth.controllers";

const router = Router();

router.post('/clients/register', postCreateUser);
router.post('/clients/login');

export { router };