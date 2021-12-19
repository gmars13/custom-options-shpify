"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _shop = _interopRequireDefault(require("./router/shop.routes"));

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json()); // app.use(BodyParser)
// app.use(BodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/api', _shop["default"]);
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Listening on port ".concat(port));
});