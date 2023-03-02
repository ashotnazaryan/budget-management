import { TokenResponse } from '@react-oauth/google';

export type GoogleOauthTokenResponse = Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>;

export interface AuthState {
  isLoggedIn: boolean;
  token: string;
  status?: 'idle' | 'succeeded';
}
