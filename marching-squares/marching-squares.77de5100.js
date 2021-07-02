// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/vector2.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.v2 = void 0;
exports.v2 = {
  scale: function scale(a, n) {
    return [a[0] * n, a[1] * n];
  },
  sub: function sub(a, b) {
    return [a[0] - b[0], a[1] - b[1]];
  },
  dot: function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  },
  reflect: function reflect(a, norm) {
    var d = exports.v2.scale(norm, exports.v2.dot(a, norm));
    return exports.v2.sub(exports.v2.scale(d, 2), a);
  },
  fromAngle: function fromAngle(n) {
    return [Math.cos(n), Math.sin(n)];
  },
  toAngle: function toAngle(a) {
    return Math.atan2(a[1], a[0]);
  }
};
},{}],"src/ball.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ball = void 0;

var vector2_1 = require("./vector2");

var Ball =
/** @class */
function () {
  function Ball(width, height, x, y, radius, speed, angle) {
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  Ball.prototype.update = function () {
    var _a = this,
        x = _a.x,
        y = _a.y;

    var dx = Math.cos(this.angle) * this.speed;
    var dy = Math.sin(this.angle) * this.speed;
    var v = vector2_1.v2.fromAngle(this.angle);
    var r = null;

    if (y + dy > this.height) {
      r = vector2_1.v2.reflect(v, [1, 0]);
    }

    if (y + dy < 0) {
      r = vector2_1.v2.reflect(v, [-1, 0]);
    }

    if (x + dx > this.width) {
      r = vector2_1.v2.reflect(v, [0, -1]);
    }

    if (x + dx < 0) {
      r = vector2_1.v2.reflect(v, [0, 1]);
    }

    if (r !== null) {
      var newAngle = vector2_1.v2.toAngle(r);
      this.angle = newAngle;
    } else {
      this.x += dx;
      this.y += dy;
    }
  };

  return Ball;
}();

exports.Ball = Ball;
},{"./vector2":"src/vector2.ts"}],"src/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deg2Rad = exports.randDeviate = exports.randRange = exports.randSign = exports.randInt = exports.rand = void 0;
var random = Math.random,
    floor = Math.floor,
    PI = Math.PI;

var rand = function rand(n) {
  if (n === void 0) {
    n = 1;
  }

  return random() * n;
};

exports.rand = rand;

var randInt = function randInt(range) {
  return floor(exports.rand() * range);
};

exports.randInt = randInt;

var randSign = function randSign() {
  return exports.rand() >= 0.5 ? 1 : -1;
};

exports.randSign = randSign;

var randRange = function randRange(from, to) {
  return exports.rand(to - from) + from;
};

exports.randRange = randRange;

var randDeviate = function randDeviate(n) {
  return exports.rand(n * 2) - n;
};

exports.randDeviate = randDeviate;

var deg2Rad = function deg2Rad(d) {
  return d * PI / 180;
};

exports.deg2Rad = deg2Rad;
},{}],"src/render.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Render = void 0;

var ball_1 = require("./ball");

var utils_1 = require("./utils");

var colors = {
  grid: "#263339",
  ball: "salmon",
  influence: "indianred"
};
var lines = {
  leftBottom: [0, 0.5, 0.5, 1],
  rightBottom: [1, 0.5, 0.5, 1],
  rightTop: [0.5, 0, 1, 0.5],
  leftTop: [0.5, 0, 0, 0.5],
  horizontal: [0, 0.5, 1, 0.5],
  vertical: [0.5, 0, 0.5, 1]
};
var configurationsLUT = {
  0: [],
  1: [lines.leftBottom],
  2: [lines.rightBottom],
  3: [lines.horizontal],
  4: [lines.rightTop],
  5: [lines.leftTop, lines.rightBottom],
  6: [lines.vertical],
  7: [lines.leftTop],
  8: [lines.leftTop],
  9: [lines.vertical],
  10: [lines.rightTop, lines.leftBottom],
  11: [lines.rightTop],
  12: [lines.horizontal],
  13: [lines.rightBottom],
  14: [lines.leftBottom],
  15: []
};

var Render =
/** @class */
function () {
  function Render(canvas, ctx) {
    var _this = this;

    this.width = 640;
    this.height = 480;
    this.gridStep = 8;
    this.balls = [];
    this.influences = [];
    this.configurations = [];
    this.config = {
      grid: true,
      balls: true,
      metaballs: true,
      smoothing: true
    };
    this.canvas = canvas;
    this.ctx = ctx;
    canvas.width = this.width;
    canvas.height = this.height;
    this.widthCells = Math.ceil(this.width / this.gridStep);
    this.heightCells = Math.ceil(this.height / this.gridStep);

    for (var x = 0; x <= this.widthCells; x++) {
      var column = Array(this.heightCells);
      column.fill(0);
      this.influences.push(column);
    }

    for (var x = 0; x <= this.widthCells; x++) {
      var column = Array(this.heightCells);
      column.fill(0);
      this.configurations.push(column);
    }

    for (var i = 0; i < 10; ++i) {
      this.balls.push(new ball_1.Ball(this.width, this.height, utils_1.rand(this.width), utils_1.rand(this.height), utils_1.randRange(30, 50), utils_1.randRange(1, 2), utils_1.rand(Math.PI * 2)));
    }

    var tick = function tick() {
      _this.clear();

      _this.updateBalls();

      _this.calcConfigurations();

      _this.config.grid && _this.drawGrid();
      _this.config.balls && _this.drawBalls();
      _this.config.metaballs && _this.drawConfigurations();
      requestAnimationFrame(tick);
    };

    tick();
  }

  Render.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
  };

  Render.prototype.updateBalls = function () {
    this.balls.forEach(function (ball) {
      return ball.update();
    });
  };

  Render.prototype.drawGrid = function () {
    this.ctx.fillStyle = colors.grid;

    for (var x = 0; x < this.width; x += this.gridStep) {
      this.ctx.fillRect(x, 0, 1, this.height);
    }

    for (var y = 0; y < this.height; y += this.gridStep) {
      this.ctx.fillRect(0, y, this.width, 1);
    }
  };

  Render.prototype.calcConfigurations = function () {
    var _this = this;

    var _loop_1 = function _loop_1(x) {
      var _loop_2 = function _loop_2(y) {
        var influence = this_1.balls.reduce(function (prev, curr) {
          var xx = Math.pow(x * _this.gridStep - curr.x, 2);
          var yy = Math.pow(y * _this.gridStep - curr.y, 2);
          return Math.pow(curr.radius, 2) / (xx + yy) + prev;
        }, 0);
        this_1.influences[x][y] = influence;
      };

      for (var y = 0; y <= this_1.heightCells; y++) {
        _loop_2(y);
      }
    };

    var this_1 = this;

    for (var x = 0; x <= this.widthCells; x++) {
      _loop_1(x);
    }

    for (var i = 0; i < this.widthCells; i++) {
      for (var j = 0; j < this.heightCells; j++) {
        var c = 0;

        if (this.influences[i][j] >= 1) {
          c = c | 8;
        }

        if (this.influences[i + 1][j] >= 1) {
          c = c | 4;
        }

        if (this.influences[i][j + 1] >= 1) {
          c = c | 1;
        }

        if (this.influences[i + 1][j + 1] >= 1) {
          c = c | 2;
        }

        this.configurations[i][j] = c;
      }
    }
  };

  Render.prototype.drawLine = function (i, j, coefs) {
    var s = this.gridStep;
    var is = i * s;
    var js = j * s;
    this.ctx.beginPath();
    this.ctx.moveTo(coefs[0] * s + is, coefs[1] * s + js);
    this.ctx.lineTo(coefs[2] * s + is, coefs[3] * s + js);
    this.ctx.stroke();
  };

  Render.prototype.drawConfigurations = function () {
    var _this = this;

    this.ctx.strokeStyle = colors.influence;

    var _loop_3 = function _loop_3(i) {
      var _loop_4 = function _loop_4(j) {
        var configuration = this_2.configurations[i][j];
        configurationsLUT[configuration].forEach(function (coefs) {
          return _this.drawLine(i, j, coefs);
        });
      };

      for (var j = 0; j < this_2.configurations[i].length; j++) {
        _loop_4(j);
      }
    };

    var this_2 = this;

    for (var i = 0; i < this.configurations.length; i++) {
      _loop_3(i);
    }
  };

  Render.prototype.drawBalls = function () {
    var _this = this;

    this.ctx.strokeStyle = colors.ball;
    this.balls.forEach(function (ball) {
      _this.ctx.beginPath();

      _this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);

      _this.ctx.stroke();
    });
  };

  return Render;
}();

exports.Render = Render;
},{"./ball":"src/ball.ts","./utils":"src/utils.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var render_1 = require("./src/render");

var init = function init() {
  var canvas = document.getElementById("c");

  if (!(canvas instanceof HTMLCanvasElement)) {
    return;
  }

  var ctx = canvas.getContext("2d");

  if (ctx === null) {
    return;
  }

  var gridCheckbox = document.querySelector('input[name="grid"]');
  var ballsCheckbox = document.querySelector('input[name="balls"]');
  var metaballsCheckbox = document.querySelector('input[name="metaballs"]');
  var smoothingCheckbox = document.querySelector('input[name="smoothing"]');

  if (!(gridCheckbox instanceof HTMLInputElement) || !(ballsCheckbox instanceof HTMLInputElement) || !(metaballsCheckbox instanceof HTMLInputElement) || !(smoothingCheckbox instanceof HTMLInputElement)) {
    return;
  }

  var render = new render_1.Render(canvas, ctx);

  var onCheckboxClick = function onCheckboxClick() {
    render.config.grid = gridCheckbox.checked;
    render.config.balls = ballsCheckbox.checked;
    render.config.metaballs = metaballsCheckbox.checked;
    render.config.smoothing = smoothingCheckbox.checked;
  };

  gridCheckbox.onclick = onCheckboxClick;
  ballsCheckbox.onclick = onCheckboxClick;
  metaballsCheckbox.onclick = onCheckboxClick;
  smoothingCheckbox.onclick = onCheckboxClick;
};

init();
},{"./src/render":"src/render.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53512" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/marching-squares.77de5100.js.map