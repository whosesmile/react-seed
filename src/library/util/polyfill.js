// only import necessary polyfill, not all the core-js/babel-polyfill
import 'core-js/es6/array';
import 'core-js/es6/string';
import 'core-js/es6/promise';

// for react 16
import 'core-js/es6/map';
import 'core-js/es6/set';

// for react 16
const g = typeof global == 'undefined' ? window : global;
g.requestAnimationFrame = g.requestAnimationFrame || (callback => setTimeout(callback, 0));
