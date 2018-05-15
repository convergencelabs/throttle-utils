export interface ICancelableCallback<T> {
  callback: T;
  cancel(): void;
}

export type AnyFunc = (...args: any[]) => void;
