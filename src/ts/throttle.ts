import {AnyFunc, ICancelableCallback} from "./callback";

export function throttle<T extends AnyFunc>(this: any,
                                            callback: T,
                                            minIntervalMs: number): T {
  return throttleWithCancel(callback, minIntervalMs).callback;
}

export function throttleWithCancel<T extends AnyFunc>(this: any,
                                                      callback: T,
                                                      minIntervalMs: number): ICancelableCallback<T> {

  let lastEventTime: number = 0;
  let finalEventTimerId: any = null;
  const context: any = this;

  const func = (...args: any[]) => {
    const time = Date.now();
    const delta = time - lastEventTime;

    if (delta > minIntervalMs) {
      lastEventTime = time;
      callback.apply(context, args);
    } else {
      if (finalEventTimerId) {
        clearTimeout(finalEventTimerId);
        finalEventTimerId = null;
      }
      finalEventTimerId = setTimeout(() => {
        callback.apply(context, args);
      }, minIntervalMs - delta);
    }
  };

  return {
    callback: func as T,
    cancel: () => {
      clearTimeout(finalEventTimerId);
    }
  }
}
