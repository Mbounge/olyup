import express, { Request, Response } from 'express'; // all boiler plate //

const router = express.Router();

router.post('/api/users/signout', (req: Request, res: Response) => {
  req.session = null;

  res.send({});
});

export { router as signoutRouter };
