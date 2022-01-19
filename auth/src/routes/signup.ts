import express, { Request, Response } from 'express'; // all boiler plate //
import jwt from 'jsonwebtoken';

import { BadRequestError, validateRequest } from '@olyup/common';
import { body } from 'express-validator';
import { User } from '../model/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, userType, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use!');
    }

    const user = User.build({ email, password, userType, firstName, lastName });
    await user.save();

    console.log('Creating a user...');

    // Generate JWT, under snychronously
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        userType: user.userType,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    // This is what is sent to the users browswer
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
