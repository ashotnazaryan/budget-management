export type StatusState = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface ErrorResponse {
  message: string;
  status: number;
}
