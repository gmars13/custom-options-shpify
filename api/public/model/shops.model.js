"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _db = _interopRequireDefault(require("./db"));

var _shopifyClient = _interopRequireDefault(require("../helpers/shopify-client.helpers"));

var ShopModel = function ShopModel() {
  var _this = this;

  (0, _classCallCheck2["default"])(this, ShopModel);
  (0, _defineProperty2["default"])(this, "fetchAccessToken", /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(shop) {
      var store;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              store = shop.replace("https:\/\/", "");
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                _db["default"].query('SELECT id, name, access_token FROM shops WHERE name =?', [store], function (err, result) {
                  if (err) {
                    return reject(err);
                  }

                  return resolve(result);
                });
              }));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  (0, _defineProperty2["default"])(this, "createProductOptions", /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(query) {
      var _yield$_this$fetchAcc, _yield$_this$fetchAcc2, shopData, createClient, _createClient$restCli, client, DataType, params, data;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this.fetchAccessToken(query.shop);

            case 2:
              _yield$_this$fetchAcc = _context2.sent;
              _yield$_this$fetchAcc2 = (0, _slicedToArray2["default"])(_yield$_this$fetchAcc, 1);
              shopData = _yield$_this$fetchAcc2[0];
              console.log(shopData);
              createClient = new _shopifyClient["default"]();
              _createClient$restCli = createClient.restClient(shopData.name, shopData.access_token), client = _createClient$restCli.client, DataType = _createClient$restCli.DataType;
              console.log(client);
              params = {
                "product": {
                  "title": "Working API Custom Product",
                  "body_html": "Custom product",
                  "variants": [{
                    "option1": "First",
                    "price": "100.00",
                    "sku": "123"
                  }]
                }
              };
              _context2.next = 12;
              return client.post({
                path: 'products',
                data: params,
                type: DataType.JSON
              });

            case 12:
              data = _context2.sent;
              return _context2.abrupt("return", data);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  (0, _defineProperty2["default"])(this, "registerShop", /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(params) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", new Promise(function (resolve, reject) {
                _db["default"].query('INSERT INTO shops (name, access_token, created_at, updated_at) VALUES (?, ?, ?, ?);', [params.shop, params.token, new Date(), new Date()], function (err, result) {
                  if (err) {
                    return reject(err);
                  }

                  return resolve(result);
                });
              }));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());
};

var _default = ShopModel;
exports["default"] = _default;