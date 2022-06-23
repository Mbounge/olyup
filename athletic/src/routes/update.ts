import {
  NotFoundError,
  validateRequest,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@olyup/common';
import express, { Response, Request } from 'express';
import { Athletic } from '../models/athletic';
import { body } from 'express-validator';
import { AthleticUpdatedPublisher } from '../events/publishers/athletic-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();
var exerciseIndex;

router.put(
  '/api/athletic/:id',
  requireAuth,
  [body('discipline').not().isEmpty().withMessage('Sport is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    //const athletic = await Athletic.findById(req.params.id);
    const athletic = await Athletic.find({ userId: req.params.id })
      .populate('exercises')
      .populate('rosterInd')
      .populate('rosterTeam');

    console.log(athletic);

    console.log(req.body);

    if (athletic.length === 0) {
      throw new NotFoundError();
    }

    if (athletic[0].userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    console.log(athletic);

    athletic[0].set({
      discipline: req.body.discipline,
      position: req.body.position,
      height: req.body.height,
      weight: req.body.weight,
      DOB: req.body.DOB,
      sex: req.body.sex,
      measurement: req.body.measurement,
      userName: `${req.currentUser!.firstName} ${req.currentUser!.lastName}`,
      type: req.currentUser!.userType,
    });

    // if (req.body.library) {
    //   athletic[0].library.includes(req.body.library)
    //     ? void 0
    //     : athletic[0].library.push(req.body.library);
    // }

    if (req.body.library) {
      // new
      // exerciseIndex = athletic[0].library.findIndex(
      //   //@ts-ignore
      //   (obj) => obj.ExerciseName === req.body.library.OldExerciseName
      // );

      // // update exercise in library
      // if (exerciseIndex >= 0) {
      //   console.log('Got it!');
      //   athletic[0].library[exerciseIndex] = req.body.library;
      // } else if (exerciseIndex == -1) {
      //   // push new exercise in library
      //   athletic[0].library.push(req.body.library);
      // }

      //   const newState = state.map(obj =>
      //     obj.id === "101" ? { ...obj, completed: true } : obj
      // );

      if (
        athletic[0].library.some(
          //@ts-ignore
          (obj) => obj.ExerciseName === req.body.library.OldExerciseName
        )
      ) {
        //@ts-ignore
        athletic[0].library = athletic[0].library.map((obj) =>
          //@ts-ignore
          obj.ExerciseName === req.body.library.OldExerciseName
            ? req.body.library
            : obj
        );
      } else {
        athletic[0].library.push(req.body.library);
      }
    }

    await athletic[0].save();

    new AthleticUpdatedPublisher(natsWrapper.client).publish({
      id: athletic[0].id,
      discipline: athletic[0].discipline,
      type: athletic[0].type,
      userId: athletic[0].userId,
      version: athletic[0].version,
      userName: `${req.currentUser!.firstName} ${req.currentUser!.lastName}`,
      library: athletic[0].library,
    });

    return res.send(athletic);
  }
);

export { router as updateAthleticRouter };
