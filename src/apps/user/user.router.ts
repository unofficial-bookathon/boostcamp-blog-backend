import express from 'express';
import { validator } from '../../common/middlewares/validate.middleware';
import { GetUserRequestDto } from './types/get-user-request.dto';
import { userController } from './user.controller';

const router = express.Router();

router.get('/:id', validator({ param: GetUserRequestDto }), userController.getUser);

export { router as userRouter };
