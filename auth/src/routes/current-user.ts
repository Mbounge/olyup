import express, { Request, Response } from 'express'; // all boiler plate //

import { currentUser } from '@olyup/common';

const router = express.Router();

router.get(
  '/api/users/currentUser',
  currentUser,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
