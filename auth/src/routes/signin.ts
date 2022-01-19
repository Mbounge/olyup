import express, { Response, Request } from 'express'; // all boiler plate //
import { body } from 'express-validator';
import { BadRequestError, validateRequest } from '@olyup/common';
import { User } from '../model/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    // Generate JWT, under snychronously
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        userType: existingUser.userType,
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

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
