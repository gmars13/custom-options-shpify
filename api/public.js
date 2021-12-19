"use strict";
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
"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/options', function (req, res, next) {
  res.json({
    test: "test"
  });
});
var _default = router;
exports["default"] = _default;
"use strict";

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _shop = _interopRequireDefault(require("./router/shop.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use('/api', _shop["default"]);
app.get('/options', function (req, res) {
  res.send("test");
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Listening on port ".concat(port));
});
