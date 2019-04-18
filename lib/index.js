'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _requestPromiseNative = _interopRequireDefault(require("request-promise-native"));

var _sicredi = _interopRequireDefault(require("./erros/sicredi"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sicredi =
/*#__PURE__*/
function () {
  function Sicredi(options) {
    _classCallCheck(this, Sicredi);

    this.apiURL = options.apiURL || _config.API_URL;
    this.token = options.token;
    this.agency = options.agency;
    this.assignor = options.assignor;
    this.station = options.station;
    this.strictSSL = options.strictSSL || false;
  }

  _createClass(Sicredi, [{
    key: "request",
    value: function request(path, headers, options) {
      var optionsRequest = _objectSpread({
        strictSSL: this.strictSSL,
        uri: "".concat(this.apiURL, "/").concat(path),
        headers: headers
      }, options, {
        json: true
      });

      return (0, _requestPromiseNative.default)(optionsRequest).then(function (response) {
        return response;
      }).catch(function (error) {
        throw new _sicredi.default(error.error);
      });
    }
  }, {
    key: "auth",
    value: function auth(keyMaster) {
      var headers = {
        token: keyMaster,
        'Content-Type': 'application/json'
      };
      var options = {
        method: 'POST'
      };
      return this.request(_config.AUTH_PATH, headers, options);
    }
  }, {
    key: "create",
    value: function create(body) {
      var headers = {
        token: this.token,
        'Content-Type': 'application/json'
      };
      var options = {
        method: 'POST',
        body: _objectSpread({}, body, {
          agencia: this.agency,
          cedente: this.assignor,
          posto: this.station
        })
      };
      return this.request(_config.CREATE_PATH, headers, options);
    }
  }, {
    key: "find",
    value: function find(qs) {
      var headers = {
        token: this.token
      };
      var options = {
        method: 'GET',
        qs: _objectSpread({}, qs, {
          agencia: this.agency,
          cedente: this.assignor,
          posto: this.station
        })
      };
      return this.request(_config.FIND_PATH, headers, options);
    }
  }, {
    key: "print",
    value: function print(qs) {
      var headers = {
        token: this.token
      };
      var options = {
        method: 'GET',
        qs: _objectSpread({}, qs, {
          agencia: this.agency,
          cedente: this.assignor,
          posto: this.station
        })
      };
      return this.request(_config.PRINT_PATH, headers, options);
    }
  }, {
    key: "change",
    value: function change(body) {
      var headers = {
        token: this.token,
        'Content-Type': 'application/json'
      };
      var options = {
        method: 'POST',
        body: _objectSpread({}, body, {
          agencia: this.agency,
          cedente: this.assignor,
          posto: this.station
        })
      };
      return this.request(_config.CHANGE_PATH, headers, options);
    }
  }, {
    key: "health",
    value: function health(qs) {
      var headers = {
        token: this.token
      };
      var options = {
        method: 'GET'
      };
      return this.request(_config.HEALTH_PATH, headers, options);
    }
  }]);

  return Sicredi;
}();

var _default = Sicredi;
exports.default = _default;