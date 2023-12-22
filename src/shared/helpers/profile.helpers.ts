import { UserProfile, UserProfileDTO } from 'shared/models';

export const mapProfile = (profile: UserProfileDTO): UserProfile => {
  return {
    ...profile
  };
};
