import express, { Request, Response } from 'express';
import { Athletic } from '../models/athletic';

const router = express.Router();

// For all coaches
router.get('/api/athletic', async (req: Request, res: Response) => {
  const athletics = await Athletic.find({}).populate('exercises');

  res.send(athletics);
});

export { router as IndexAthleticRouter };
