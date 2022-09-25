import { dataSource } from '../../common/data-source';
import { User } from './user.entity';

export const userRepository = dataSource.getRepository(User).extend({
  findById(id: number) {
    return this.findOneBy({ id });
  },
});
