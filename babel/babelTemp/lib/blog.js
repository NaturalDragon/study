"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var Person = /*#__PURE__*/function () {
  function Person(x, y) {
    (0, _classCallCheck2.default)(this, Person);
    this.x = x;
    this.y = y;
  }

  (0, _createClass2.default)(Person, [{
    key: "getX",
    value: function getX() {
      return this.x;
    }
  }]);
  return Person;
}();

var cp = new Person(25, 8);