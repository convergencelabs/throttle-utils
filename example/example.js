const debounceSource = $("#debounce");
const debounceValue = $("#debounced-value");
const debounced = ThrottleUtils.debounceWithCancel((event) => {
  debounceValue.text(formatMouseEvent(event));
}, 1000);

debounceSource.mousemove(debounced.callback);
debounceSource.mouseout(() => {
  debounced.cancel();
  debounceValue.text("Canceled");
});

const throttleSource = $("#throttle");
const throttleValue = $("#throttled-value");
const throttled = ThrottleUtils.throttleWithCancel((event) => {
  throttleValue.text(formatMouseEvent(event));
}, 500);

throttleSource.mousemove(throttled.callback);
throttleSource.mouseout(() => {
  throttled.cancel();
  throttleValue.text("Canceled");
});

function formatMouseEvent(evt) {
  const m = moment(new Date().getTime());
  return `(${evt.clientX}, ${evt.clientY}) @ ${m.format("hh:mm:ss")}`;
}