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
})({"classes/Transaction.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transaction = void 0;

var Transaction =
/** @class */
function () {
  function Transaction(_name, _type, _montant) {
    this.name = _name;
    this.type = _type;
    this.montant = _montant;
  }

  Transaction.prototype.getName = function () {
    return this.name;
  };

  Transaction.prototype.getType = function () {
    return this.type;
  };

  Transaction.prototype.getMontant = function () {
    return this.montant;
  };

  Transaction.prototype.getDescription = function () {
    if (this.type == 'debit') {
      return this.name + ' a fait un retrait de ' + this.montant;
    } else {
      return this.name + ' a fait un depot de ' + this.montant;
    }
  };

  return Transaction;
}();

exports.Transaction = Transaction;
},{}],"classes/Caisse.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Caisse = void 0;

var Transaction_1 = require("./Transaction");

var Caisse =
/** @class */
function () {
  function Caisse() {
    this.observers = [];
    this.solde = 0;
    this.transactions = []; //
  }

  Caisse.prototype.subscribe = function (obs) {
    this.observers.push(obs);
    obs.update(this);
  };

  Caisse.prototype.unsubscribe = function (obs) {
    var idx = this.observers.indexOf(obs);
    this.observers.splice(idx, 1);
  };

  Caisse.prototype.notifyObservers = function () {
    for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
      var elm = _a[_i];
      elm.update(this);
    }
  };

  Caisse.prototype.setSolde = function (sl) {
    this.solde = sl;
    this.notifyObservers();
  };

  Caisse.prototype.getSolde = function () {
    return this.solde;
  };

  Caisse.prototype.getTransactions = function () {
    return this.transactions;
  };

  Caisse.prototype.addTransaction = function (name, type, montant) {
    this.transactions.push(new Transaction_1.Transaction(name, type, montant));

    if (type === 'credit') {
      this.solde += montant;
    } else {
      this.solde -= montant;
    }

    this.notifyObservers();
  };

  return Caisse;
}();

exports.Caisse = Caisse;
},{"./Transaction":"classes/Transaction.ts"}],"classes/TransactionCount.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionCount = void 0;

var TransactionCount =
/** @class */
function () {
  function TransactionCount() {
    this.debitTd = document.querySelector('#nombre_transaction_debit');
    this.creditTd = document.querySelector('#nombre_transaction_credit');
  }

  TransactionCount.prototype.update = function (caisse) {
    var transactions = caisse.getTransactions();
    var nbrDebit = 0;
    var nbrCredit = 0;

    for (var _i = 0, transactions_1 = transactions; _i < transactions_1.length; _i++) {
      var trans = transactions_1[_i];

      if (trans.getType() == "debit") {
        nbrDebit += 1;
      } else {
        nbrCredit += 1;
      }
    }

    this.debitTd.innerText = nbrDebit.toString();
    this.creditTd.innerText = nbrCredit.toString();
  };

  return TransactionCount;
}();

exports.TransactionCount = TransactionCount;
},{}],"classes/SoldeView.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoldeView = void 0;

var SoldeView =
/** @class */
function () {
  function SoldeView() {
    this.htmlSolde = document.querySelector("#solde_total");
  }

  SoldeView.prototype.update = function (caisse) {
    this.htmlSolde.innerText = caisse.getSolde().toString();
  };

  return SoldeView;
}();

exports.SoldeView = SoldeView;
},{}],"classes/TransactionList.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionList = void 0;

var TransactionList =
/** @class */
function () {
  function TransactionList() {
    this.ulList = document.querySelector('#trans_liste');
  }

  TransactionList.prototype.update = function (caisse) {
    var transactions = caisse.getTransactions();
    var li = document.createElement("li");
    caisse.getTransactions().forEach(function (element) {
      if (element.getType() === "debit") {
        li.innerHTML = "\n            <li class=\"card\">\n                <div class=\"card-header\">\n                    <span class=\"badge badge-debit\">Debit : ".concat(element.getMontant(), " CFA</span>\n                    <p class=\"descript\">").concat(element.getDescription(), "</p>\n                </div>\n            </li>\n        ");
      } else {
        li.innerHTML = "\n                <li class=\"card\">\n                    <div class=\"card-header\">\n                        <span class=\"badge badge-credit\">Credit : ".concat(element.getMontant(), " CFA</span>\n                        <p class=\"descript\">").concat(element.getDescription(), "</p>\n                    </div>\n                </li>\n            ");
      }
    });
    this.ulList.append(li);
    /* for(const trans of transactions){
        if (trans.getType() === "debit") {
            this.ulList.innerHTML = `
                <li class="card">
                    <div class="card-header">
                        <span class="badge badge-debit">Debit : ${trans.getMontant()} CFA</span>
                        <p class="descript">${trans.getDescription()}</p>
                    </div>
                </li>
            `
        }
        else {
            this.ulList.innerHTML =`
                <li class="card">
                    <div class="card-header">
                        <span class="badge badge-credit">Credit : ${trans.getMontant()} CFA</span>
                        <p class="descript">${trans.getDescription()}</p>
                    </div>
                </li>
            `
        }
    } */
  };

  return TransactionList;
}();

exports.TransactionList = TransactionList;
},{}],"classes/TransactionName.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionName = void 0;

var TransactionName =
/** @class */
function () {
  function TransactionName() {
    this.result = [];
  }

  TransactionName.prototype.update = function (caisse) {
    var transactions = caisse.getTransactions();
    this.tbody = document.querySelector('#trans_name');

    var _loop_1 = function _loop_1(trans) {
      var index = this_1.result.findIndex(function (el) {
        return trans.getName() === el.name;
      });

      if (index === -1) {
        var newResult = {
          name: trans.getName(),
          credit: trans.getType() === "credit" ? trans.getMontant() : 0,
          debit: trans.getType() === "debit" ? trans.getMontant() : 0
        };
        this_1.result.push(newResult);
      } else {
        if (trans.getType() === "credit") {
          this_1.result[index].credit += trans.getMontant();
        } else {
          this_1.result[index].debit += trans.getMontant();
        }
      }
    };

    var this_1 = this;

    for (var _i = 0, transactions_1 = transactions; _i < transactions_1.length; _i++) {
      var trans = transactions_1[_i];

      _loop_1(trans);
    }

    this.tbody.innerHTML = "";

    for (var _a = 0, _b = this.result; _a < _b.length; _a++) {
      var rs = _b[_a];
      this.tbody.innerHTML += "\n                <tr>\n                    <td>".concat(rs.name, "</td>\n                    <td>").concat(rs.credit, "</td>\n                    <td>").concat(rs.debit, "</td>\n                </tr>\n            ");
    }
  };

  return TransactionName;
}();

exports.TransactionName = TransactionName;
},{}],"app.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Caisse_1 = require("./classes/Caisse");

var TransactionCount_1 = require("./classes/TransactionCount");

var SoldeView_1 = require("./classes/SoldeView");

var TransactionList_1 = require("./classes/TransactionList");

var TransactionName_1 = require("./classes/TransactionName");

var caisse = new Caisse_1.Caisse();
var soldeView = new SoldeView_1.SoldeView();
caisse.subscribe(soldeView);
var transactionCount = new TransactionCount_1.TransactionCount();
caisse.subscribe(transactionCount);
var transactionList = new TransactionList_1.TransactionList();
caisse.subscribe(transactionList);
var transactionName = new TransactionName_1.TransactionName();
caisse.subscribe(transactionName);
var formTransaction = document.querySelector("#form_transaction");
formTransaction.addEventListener("submit", function (e) {
  e.preventDefault();
  var name = document.querySelector('#name');
  var type = document.querySelector('#type');
  var montant = document.querySelector('#montant');
  caisse.addTransaction(name.value, type.value, parseInt(montant.value));
});
},{"./classes/Caisse":"classes/Caisse.ts","./classes/TransactionCount":"classes/TransactionCount.ts","./classes/SoldeView":"classes/SoldeView.ts","./classes/TransactionList":"classes/TransactionList.ts","./classes/TransactionName":"classes/TransactionName.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61070" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.ts"], null)
//# sourceMappingURL=/app.c61986b1.js.map