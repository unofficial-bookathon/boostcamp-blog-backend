import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.get('/:id', userController.getUser);

export { router as userRouter };
