export interface UserState {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  locale?: string;
  loading?: boolean;
}
