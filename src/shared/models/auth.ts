import { TokenResponse } from '@react-oauth/google';

export type GoogleOauthTokenResponse = Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>;

export interface Auth {
  token: string;
}
