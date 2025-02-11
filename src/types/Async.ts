export type AsyncStatus = 'IDLE' | 'LOADING' | 'SUCCEEDED' | 'FAILED';

export interface AsyncState {
  status: AsyncStatus;
  error: string;
}
