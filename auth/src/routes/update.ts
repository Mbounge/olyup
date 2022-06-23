import express, { Request, Response } from 'express'; // all boiler plate //
import jwt from 'jsonwebtoken';

import { BadRequestError, validateRequest, requireAuth } from '@olyup/common';

import { User } from '../model/user';

const router = express.Router();

router.put('/api/users/update', async (req: Request, res: Response) => {
  const { email, password, userType, firstName, lastName } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new BadRequestError('Email not Found!');
  }

  existingUser.set({
    userType: userType,
  });

  await existingUser.save();

  console.log('Updating a user...');

  // Generate JWT, under snychronously
  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
      userType: userType,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
    },
    process.env.JWT_KEY!
  );

  // Store it on session object
  // This is what is sent to the users browswer
  req.session = {
    jwt: userJwt,
  };

  res.status(201).send(existingUser);
});

export { router as updateRouter };
