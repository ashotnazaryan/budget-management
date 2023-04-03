export interface UserDTO {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export interface User {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  fullName: string;
  avatar: string;
}
