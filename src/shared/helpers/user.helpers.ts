import { User, UserDTO } from 'shared/models';

export const mapUser = (user: UserDTO): User => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.given_name,
    lastName: user.family_name,
    fullName: user.name,
    avatar: user.picture,
  };
};
