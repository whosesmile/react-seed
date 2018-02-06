function isString(s) {
  const t = typeof s;
  return t === 'string' || (t === 'object' && s !== null && !Array.isArray(s) && Object.prototype.toString.call(s) === '[object String]');
}

function isObject(o) {
  return (
    o != null &&
    typeof o === 'object' &&
    Array.isArray(o) === false &&
    Object.prototype.toString.call(o) === '[object Object]'
  );
}

function isPlainObject(o) {
  var ctor, prot;

  if (isObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) return false;

  // Most likely a plain Object
  return true;
}

export default (action) => {
  return (
    isPlainObject(action) &&
    isString(action.type) &&
    Object.keys(action).every(key => ['type', 'payload', 'error', 'meta'].indexOf(key) > -1)
  );
};
