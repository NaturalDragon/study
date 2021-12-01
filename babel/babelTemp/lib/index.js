"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _context;

var Point = /*#__PURE__*/function () {
  function Point(x, y) {
    (0, _classCallCheck2.default)(this, Point);
    this.x = x;
    this.y = y;
  }

  (0, _createClass2.default)(Point, [{
    key: "getX",
    value: function getX() {
      return this.x;
    }
  }]);
  return Point;
}();

var cp = new ColorPoint(25, 8);

var fn = function fn() {
  console.log('a');
};

var isHas = (0, _includes.default)(_context = [1, 2, 3]).call(_context, 2);
var p = new _promise.default(function (resolve, reject) {
  resolve('ok');
}).then(function (res) {
  return console.log(res);
});