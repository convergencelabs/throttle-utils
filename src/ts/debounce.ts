import {AnyFunc, ICancelableCallback} from "./callback";

export function debounce<T extends AnyFunc>(this: any,
                                            callback: T, quietMs: number): T {
  return debounceWithCancel(callback, quietMs).callback;
}

export function debounceWithCancel<T extends AnyFunc>(this: any,
                                                      callback: T,
                                                      quietMs: number): ICancelableCallback<T> {
  let timerId: number;
  const debounced = (...args: any[]) => {
    const context = this;
    clearTimeout(timerId);
    timerId = setTimeout(() => callback.apply(context, args), quietMs);
  };

  return {
    callback: debounced as T,
    cancel: () => {
      clearTimeout(timerId);
    }
  };
}
