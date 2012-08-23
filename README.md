[![build status](https://secure.travis-ci.org/jaw187/compr.png)](http://travis-ci.org/jaw187/compr)
Compr
=====
Utilities to compare Javascript data

Install
-------
```
npm install compr
```

Example
-------
```javascript
var compr = require('compr');

var d1=new Date();
var d2=new Date();

console.log(compr.compare(d1,d2));
//false

console.log(compr.like(d1,d2));
//true
```
