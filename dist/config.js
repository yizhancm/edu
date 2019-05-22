'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

exports.default = {
  viewPath: (0, _path.join)(__dirname, '../views'),
  node_modules_path: (0, _path.join)(__dirname, '../node_modules'),
  public_path: (0, _path.join)(__dirname, '../public')
}; // 写法一
// export const foo = "bar"
// export const f = function () {

// }
// export const num = 10

// 写法二
//  const foo = "bar"
//  const f = function () {
// }
//  const num = 10

//  export {
//  	foo,
//  	f,
//  	num
//  }