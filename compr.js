var util = require('util');

exports.compare = function (v1,v2) {
  if (v1 === v2)
    return true;

  if (typeof v1 !== typeof v2)
    return false;

  if (typeof v1 === 'object')
    return this.compareobjs(v1,v2);

  if (typeof v1 === 'function')
    return v1.toString() === v2.toString();

  return false;
}

exports.compareobjs = function (o1,o2) {
  //if they're the same, toString() should be the same....
  //Unless it returns [object Object]
  if (o1.toString && o2.toString && typeof o1.toString === 'function' && typeof o2.toString === 'function')
    if (!(/\[object Object\]/.test(o1.toString())))
      return (o1.toString() === o2.toString())

  var param;
  for (param in o1) {
    if (typeof o2[param] === "undefined")
      return false;
  }

  for (param in o2) {
    if (typeof o1[param] === "undefined")
      return false;

    if (!this.compare(o1[param],o2[param]))
      return false;
  }

  return true;
}

exports.like = function (o1,o2) {
//Objects are alike, but not equal
  if (util.isArray(o1)) {
    if (util.isArray(o2)) {
      //does not work on arrays of mixed types
      if (o1.length === 0) {
        if (o2.length === 0) return true;
        else return false;
      }
      else if (o2.length === 0) return false;
      else {
        if (typeof o1[0] === "object")
          return this.like(o1[0],o2[0]);
        else return (typeof o1[0] === o2[0]);
      }
    }
    else return false;
  }

  if (typeof o1 !== "object") 
    return (typeof o1 === typeof o2);

  if (typeof o2 !== "object")
    return false;
 
  var param;
  for (param in o1) {
    if (typeof o2[param] === "undefined")
      return false;
  }

  for (param in o2) {
    if (typeof o1[param] === "undefined")
      return false;

    if (typeof o1[param] !== typeof o2[param])
      return false;

    if (typeof o1[param] === "object" && typeof o2[param] === "object") {
      if (!this.like(o1[param],o2[param])) return false;
    }
  }

  return true;
}
