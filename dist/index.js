"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebpackPluginTest = function () {
  function WebpackPluginTest(options) {
    _classCallCheck(this, WebpackPluginTest);

    this.options = Object.assign({ output: "./fileMap.json" }, options);
  }

  _createClass(WebpackPluginTest, [{
    key: "apply",
    value: function apply(complier) {
      var _this = this;

      complier.plugin("emit", function (compilation, cb) {
        var out = void 0,
            context = void 0;
        var fileMap = {};
        var assets = compilation.assets;
        // console.log(Object.keys(compilation));
        compilation.chunks.map(function (chunk) {
          if (chunk.name) {
            fileMap[chunk.name] = chunk.files;
          } else {
            var loc = void 0,
                block = void 0;
            chunk.blocks.map(function (b) {
              block = b;
            });
            if (block) {
              var filePath = void 0;

              loc = block.loc;
              context = block.parent.context;
              filePath = _path2.default.join(context, loc).replace(process.env.PWD, "");
              fileMap[filePath] = chunk.files;
            }
          }
        });
        out = JSON.stringify(fileMap);
        console.log("[fileMap output]", _this.options.output);
        _fs2.default.writeFile(_this.options.output, out);
        cb();
      });
    }
  }]);

  return WebpackPluginTest;
}();

exports.default = WebpackPluginTest;
