# Throttle Utils
[![Build Status](https://travis-ci.org/convergencelabs/ace-collab-ext.svg?branch=master)](https://travis-ci.org/convergencelabs/throttle-utils)

Provides utilties for throttling and debouncing callback methods. This utility implements standard throttle and doubnce methods with an added bennefit of being able to cancel both styles of callback.

## Installation
Install package with NPM and add it to your development dependencies:

```npm install --save-dev @convergence/throttle-utils```

## Usage

### `debounce(callback, quietMs)`
This method implements a standard debounce, which will only execute the callback method after defined quiet period, specified in milliseconds.

```JavaScript
import {debounce} from "@convergence/throttle-utils";

document.body.addEventListener("mousemove", debounce((event) => {
    console.log(mouseEvent);
  },
  100)
);

```

### `debounceWithCancel(callback, quietMs)`
This method provides a debounced method that is cancelable. The callback  will only execute the callback method after defined quiet period, specified in milliseconds. Ther return result is a java object of the shape `{callback: function, cancel: function}`. If you wish to cancel the next invocation of the deboucned callback you can call the cancel method as shown below:

```JavaScript
import {debounceWithCancel} from "@convergence/throttle-utils";

const debounced = debounceWithCancel((event) => {
    console.log(mouseEvent);
  },
  100
);

document.body.addEventListener("mousemove", debounced.callback);

document.body.addEventListener("mouseout", debounced.cancel());
);

```

### `throttle(callback, minIntervalMs)`
This method implements a throttling approach where the callback will fire at most every `minIntervalMs` milliseconds. Invocations to the wrapped function that occur sooner than this interval will be discarded. However, when the interval is reached the last called to the wrapped method will be invoked on the callback. In essance as long as the throttled method is being invoked, the callback will be invoked every `minIntervalMs`

```JavaScript
import {throttle} from "@convergence/throttle-utils";

document.body.addEventListener("mousemove", throttle((event) => {
    console.log(mouseEvent);
  },
  100)
);

```

### `throttleWithCancel(callback, minIntervalMs)`
This method provides a throttled method that is cancelable. The callback  will only execute the as in the throttle method above. Ther return result is a java object of the shape `{callback: function, cancel: function}`. If you wish to cancel the next invocation of the deboucned callback you can call the cancel method as shown below:

```JavaScript
import {throttleWithCancel} from "@convergence/throttle-utils";

const debounced = debounceWithCancel((event) => {
    console.log(mouseEvent);
  },
  100
);

document.body.addEventListener("mousemove", debounced.callback);

document.body.addEventListener("mouseout", debounced.cancel());
);

```