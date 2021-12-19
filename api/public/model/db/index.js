"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var db = _mysql["default"].createPool({
  connectionLimit: 10,
  password: '',
  user: 'root',
  database: 'shopify_custom_options',
  host: 'localhost',
  port: 3306
});

var _default = db;
exports["default"] = _default;