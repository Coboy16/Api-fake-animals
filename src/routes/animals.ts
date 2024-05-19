import { Request, Response, Router } from "express";
import { getDogs } from "../controllers/animals.controllers";

const router = Router();

router.get('/dogs', getDogs);

router.get('/cats', (req: Request, res: Response) => {
  res.send('CATS');
});

router.get('/bunnys', (req: Request, res: Response) => {
  res.send('BUNNY');
});

export { router };