import { NotFoundError } from '@olyup/common';
import express, { Response, Request } from 'express';
import { Athletic } from '../models/athletic';

const router = express.Router();

router.get('/api/athletic/:id', async (req: Request, res: Response) => {
  const athletic = await Athletic.findById(req.params.id).populate('exercises');

  if (!athletic) {
    throw new NotFoundError();
  }

  res.send(athletic);
});

export { router as showAthleticRouter };
