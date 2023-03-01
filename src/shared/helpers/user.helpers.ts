import { UserState } from 'shared/models';

// TODO: fix user type
export const mapUser = (user: any): UserState => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.given_name,
    lastName: user.family_name,
    avatar: user.picture,
    locale: user.locale
  };
};
