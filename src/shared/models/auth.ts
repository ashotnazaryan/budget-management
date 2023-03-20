export interface AuthState {
  accessToken: string;
  userId: string;
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
}
