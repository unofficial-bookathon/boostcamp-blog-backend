import { StatusCodes } from 'http-status-codes';
import { HttpException } from '../../common/exceptions/http.exception';
import { userRepository } from './user.repository';

const getUserById = async (id: number) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new HttpException(StatusCodes.NOT_FOUND, 'USER_NOT_FOUND', '해당하는 유저가 존재하지 않습니다');
  }

  return user;
};

export const userService = {
  getUserById,
};
