import { User, UserDTO } from 'shared/models';

export const mapUser = (user: UserDTO): User => {
  return {
    ...user
  };
};
