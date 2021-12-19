"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _shop = _interopRequireDefault(require("../controllers/shop.controller"));

var router = _express["default"].Router();

router.get('/options', _shop["default"].createProductOptions);
router.post('/register', _shop["default"].registerShop);
var _default = router;
exports["default"] = _default;