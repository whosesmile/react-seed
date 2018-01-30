/* eslint-disable no-console */

export default function warning(...args) {
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(...args);
  }
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(...args);
  } catch (e) {}
}
