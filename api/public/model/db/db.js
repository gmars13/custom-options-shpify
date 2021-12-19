"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pool = _mysql["default"].createPool({
  connectionLimit: 10,
  password: '',
  user: 'root',
  database: 'shopify_custom_options',
  host: 'localhost'
});

var _default = pool;
exports["default"] = _default;