import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../common/utils/catch-async';
import { User } from './user.entity';
import { userService } from './user.service';

const getUser = catchAsync(async (req: Request<{ id: number }, { data: User }>, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  res.status(StatusCodes.OK).json({ data: user });
});

export const userController = {
  getUser,
};
