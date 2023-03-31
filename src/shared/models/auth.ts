import { StatusState } from './common';

export interface Auth {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface AuthDTO {
  access_token: string;
  refresh_token: string;
}

export interface AuthState extends Auth {
  status: StatusState;
}
