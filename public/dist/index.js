// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"9GAIn":[function(require,module,exports,__globalThis) {
var _login = require("./login");
var _mapbox = require("./mapbox");
const mapElement = document.querySelector('#map');
const form = document.querySelector('.form');
const logoutButton = document.querySelector('.nav__el--logout');
if (mapElement) {
    const locations = JSON.parse(mapElement.dataset.locations);
    mapboxgl.accessToken = mapElement.dataset.token;
    (0, _mapbox.displayMap)(locations);
}
if (form) form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    (0, _login.login)(email, password);
});
if (logoutButton) logoutButton.addEventListener('click', (0, _login.logout));

},{"./login":"3EMOW","./mapbox":"7WBWG"}],"3EMOW":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "login", ()=>login);
parcelHelpers.export(exports, "logout", ()=>logout);
var _axios = require("axios");
var _axiosDefault = parcelHelpers.interopDefault(_axios);
var _alerts = require("./alerts");
const login = async (email, password)=>{
    if (!email || !password) return;
    try {
        const res = await (0, _axiosDefault.default).post('/api/v1/users/login', {
            email,
            password
        });
        if (res.data.status === 'success') {
            (0, _alerts.showAlert)('success', 'Logged in successfully!');
            window.setTimeout(()=>{
                location.assign('/', 1500);
            });
        }
    } catch (err) {
        (0, _alerts.showAlert)('error', err.response.data.message);
    }
};
const logout = async ()=>{
    try {
        const res = await (0, _axiosDefault.default).get('/api/v1/users/logout');
        res.data.status = 'success';
        location.reload(true);
    } catch (err) {
        (0, _alerts.showAlert)('error', 'An error occurred.Try again later!');
    }
};

},{"axios":"ebquM","./alerts":"dT0jl","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"ebquM":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>(0, _axiosJsDefault.default));
parcelHelpers.export(exports, "create", ()=>create);
parcelHelpers.export(exports, "Axios", ()=>Axios);
parcelHelpers.export(exports, "AxiosError", ()=>AxiosError);
parcelHelpers.export(exports, "CanceledError", ()=>CanceledError);
parcelHelpers.export(exports, "isCancel", ()=>isCancel);
parcelHelpers.export(exports, "CancelToken", ()=>CancelToken);
parcelHelpers.export(exports, "VERSION", ()=>VERSION);
parcelHelpers.export(exports, "all", ()=>all);
parcelHelpers.export(exports, "Cancel", ()=>Cancel);
parcelHelpers.export(exports, "isAxiosError", ()=>isAxiosError);
parcelHelpers.export(exports, "spread", ()=>spread);
parcelHelpers.export(exports, "toFormData", ()=>toFormData);
parcelHelpers.export(exports, "AxiosHeaders", ()=>AxiosHeaders);
parcelHelpers.export(exports, "HttpStatusCode", ()=>HttpStatusCode);
parcelHelpers.export(exports, "formToJSON", ()=>formToJSON);
parcelHelpers.export(exports, "getAdapter", ()=>getAdapter);
parcelHelpers.export(exports, "mergeConfig", ()=>mergeConfig);
var _axiosJs = require("./lib/axios.js");
var _axiosJsDefault = parcelHelpers.interopDefault(_axiosJs);
// This module is intended to unwrap Axios default export as named.
// Keep top-level export same with static properties
// so that it can keep same with es module or cjs
const { Axios, AxiosError, CanceledError, isCancel, CancelToken, VERSION, all, Cancel, isAxiosError, spread, toFormData, AxiosHeaders, HttpStatusCode, formToJSON, getAdapter, mergeConfig, create } = (0, _axiosJsDefault.default);

},{"./lib/axios.js":"a2LCS","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"a2LCS":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("./utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _bindJs = require("./helpers/bind.js");
var _bindJsDefault = parcelHelpers.interopDefault(_bindJs);
var _axiosJs = require("./core/Axios.js");
var _axiosJsDefault = parcelHelpers.interopDefault(_axiosJs);
var _mergeConfigJs = require("./core/mergeConfig.js");
var _mergeConfigJsDefault = parcelHelpers.interopDefault(_mergeConfigJs);
var _indexJs = require("./defaults/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _formDataToJSONJs = require("./helpers/formDataToJSON.js");
var _formDataToJSONJsDefault = parcelHelpers.interopDefault(_formDataToJSONJs);
var _canceledErrorJs = require("./cancel/CanceledError.js");
var _canceledErrorJsDefault = parcelHelpers.interopDefault(_canceledErrorJs);
var _cancelTokenJs = require("./cancel/CancelToken.js");
var _cancelTokenJsDefault = parcelHelpers.interopDefault(_cancelTokenJs);
var _isCancelJs = require("./cancel/isCancel.js");
var _isCancelJsDefault = parcelHelpers.interopDefault(_isCancelJs);
var _dataJs = require("./env/data.js");
var _toFormDataJs = require("./helpers/toFormData.js");
var _toFormDataJsDefault = parcelHelpers.interopDefault(_toFormDataJs);
var _axiosErrorJs = require("./core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _spreadJs = require("./helpers/spread.js");
var _spreadJsDefault = parcelHelpers.interopDefault(_spreadJs);
var _isAxiosErrorJs = require("./helpers/isAxiosError.js");
var _isAxiosErrorJsDefault = parcelHelpers.interopDefault(_isAxiosErrorJs);
var _axiosHeadersJs = require("./core/AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
var _adaptersJs = require("./adapters/adapters.js");
var _adaptersJsDefault = parcelHelpers.interopDefault(_adaptersJs);
var _httpStatusCodeJs = require("./helpers/HttpStatusCode.js");
var _httpStatusCodeJsDefault = parcelHelpers.interopDefault(_httpStatusCodeJs);
'use strict';
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */ function createInstance(defaultConfig) {
    const context = new (0, _axiosJsDefault.default)(defaultConfig);
    const instance = (0, _bindJsDefault.default)((0, _axiosJsDefault.default).prototype.request, context);
    // Copy axios.prototype to instance
    (0, _utilsJsDefault.default).extend(instance, (0, _axiosJsDefault.default).prototype, context, {
        allOwnKeys: true
    });
    // Copy context to instance
    (0, _utilsJsDefault.default).extend(instance, context, null, {
        allOwnKeys: true
    });
    // Factory for creating new instances
    instance.create = function create(instanceConfig) {
        return createInstance((0, _mergeConfigJsDefault.default)(defaultConfig, instanceConfig));
    };
    return instance;
}
// Create the default instance to be exported
const axios = createInstance((0, _indexJsDefault.default));
// Expose Axios class to allow class inheritance
axios.Axios = (0, _axiosJsDefault.default);
// Expose Cancel & CancelToken
axios.CanceledError = (0, _canceledErrorJsDefault.default);
axios.CancelToken = (0, _cancelTokenJsDefault.default);
axios.isCancel = (0, _isCancelJsDefault.default);
axios.VERSION = (0, _dataJs.VERSION);
axios.toFormData = (0, _toFormDataJsDefault.default);
// Expose AxiosError class
axios.AxiosError = (0, _axiosErrorJsDefault.default);
// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;
// Expose all/spread
axios.all = function all(promises) {
    return Promise.all(promises);
};
axios.spread = (0, _spreadJsDefault.default);
// Expose isAxiosError
axios.isAxiosError = (0, _isAxiosErrorJsDefault.default);
// Expose mergeConfig
axios.mergeConfig = (0, _mergeConfigJsDefault.default);
axios.AxiosHeaders = (0, _axiosHeadersJsDefault.default);
axios.formToJSON = (thing)=>(0, _formDataToJSONJsDefault.default)((0, _utilsJsDefault.default).isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = (0, _adaptersJsDefault.default).getAdapter;
axios.HttpStatusCode = (0, _httpStatusCodeJsDefault.default);
axios.default = axios;
// this module should only have a default export
exports.default = axios;

},{"./utils.js":"3iykr","./helpers/bind.js":"9J3iM","./core/Axios.js":"7TfP2","./core/mergeConfig.js":"5u78U","./defaults/index.js":"13zrE","./helpers/formDataToJSON.js":"4rQRz","./cancel/CanceledError.js":"4Mizl","./cancel/CancelToken.js":"29Czo","./cancel/isCancel.js":"kXixS","./env/data.js":"dtnmo","./helpers/toFormData.js":"gd6fR","./core/AxiosError.js":"1ZnKZ","./helpers/spread.js":"kleuW","./helpers/isAxiosError.js":"5VdvB","./core/AxiosHeaders.js":"47lYE","./adapters/adapters.js":"ezy6L","./helpers/HttpStatusCode.js":"fsxhN","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"3iykr":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _bindJs = require("./helpers/bind.js");
var _bindJsDefault = parcelHelpers.interopDefault(_bindJs);
var global = arguments[3];
'use strict';
// utils is a library of generic helper functions non-specific to axios
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const { iterator, toStringTag } = Symbol;
/* Creating a function that will check if an object has a property. */ const hasOwnProperty = (({ hasOwnProperty })=>(obj, prop)=>hasOwnProperty.call(obj, prop))(Object.prototype);
const isUnsafeObjectKey = (prop)=>typeof prop === 'string' && (prop === '__proto__' || prop === 'constructor' || prop === 'prototype');
/**
 * Determine whether an inherited object must be treated as a shared-prototype
 * boundary. Cross-realm Object.prototype objects cannot be distinguished
 * reliably from application-created null-prototype objects because their
 * properties are mutable, so all inherited terminal prototypes are excluded
 * as a fail-closed boundary. A null-prototype source still keeps its own
 * properties, as produced by mergeConfig and other safe materialization paths.
 *
 * @param {*} obj The object to inspect
 * @param {*} prototype The object's prototype
 * @param {boolean} source Whether obj is the original traversal source
 *
 * @returns {boolean} True when obj is a safe prototype traversal boundary
 */ const isPrototypeBoundary = (obj, prototype, source)=>obj === Object.prototype || !source && prototype === null;
/**
 * Determine whether an object can retain its identity through code paths that
 * add, replace, and remove config properties without bypassing unsafe-key
 * filtering. Immutable objects, unsafe-key-bearing objects, and objects with
 * accessor or restricted data properties must be materialized instead.
 *
 * @param {*} obj The object to inspect
 *
 * @returns {boolean} True when every own property is safe and fully mutable
 */ const isSafeAndFullyMutable = (obj)=>{
    if (!Object.isExtensible(obj)) return false;
    const props = Object.getOwnPropertyNames(obj);
    if (Object.getOwnPropertySymbols) props.push(...Object.getOwnPropertySymbols(obj));
    return props.every((prop)=>{
        if (isUnsafeObjectKey(prop)) return false;
        const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
        return !!descriptor && descriptor.configurable && descriptor.writable === true;
    });
};
/**
 * Walk the prototype chain (excluding the source realm's Object.prototype)
 * looking for an own `prop`. This distinguishes genuine own/inherited members
 * — including class accessors and template prototypes — from members injected
 * via Object.prototype pollution (e.g. `Object.prototype.username = '...'`),
 * which live on Object.prototype itself and are therefore never matched.
 *
 * @param {*} thing The value whose chain to inspect
 * @param {string|symbol} prop The property key to look for
 *
 * @returns {boolean} True when `prop` is owned below Object.prototype
 */ const hasOwnInPrototypeChain = (thing, prop)=>{
    let obj = thing;
    const seen = [];
    while(obj != null){
        if (seen.indexOf(obj) !== -1) return false;
        seen.push(obj);
        const prototype = getPrototypeOf(obj);
        if (isPrototypeBoundary(obj, prototype, obj === thing)) return false;
        if (hasOwnProperty(obj, prop)) return true;
        obj = prototype;
    }
    return false;
};
/**
 * Read `obj[prop]` only when it is safe from Object.prototype pollution. Own
 * properties and members inherited from a non-Object.prototype source (a class
 * instance or template object) are honored; a value reachable only through a
 * polluted Object.prototype is ignored and `undefined` is returned.
 *
 * @param {*} obj The source object
 * @param {string|symbol} prop The property key to read
 *
 * @returns {*} The resolved value, or undefined when unsafe/absent
 */ const getSafeProp = (obj, prop)=>obj != null && hasOwnInPrototypeChain(obj, prop) ? obj[prop] : undefined;
/**
 * Flatten an object and its application-defined prototype chain into a
 * null-prototype object. Members inherited only from the source realm's
 * Object.prototype are deliberately excluded, while class/template members
 * below that boundary are preserved.
 *
 * @param {*} thing The value to flatten
 *
 * @returns {*} A null-prototype copy, or the original value when it is already
 * structurally safe or is not an object
 */ const toSafeFlatObject = (thing)=>{
    if (thing == null || typeof thing !== 'object' && typeof thing !== 'function') return thing;
    const sourcePrototype = getPrototypeOf(thing);
    if (sourcePrototype === null && isSafeAndFullyMutable(thing)) return thing;
    const result = Object.create(null);
    const merged = Object.create(null);
    const seen = [];
    let current = thing;
    while(current != null){
        if (seen.indexOf(current) !== -1) break;
        seen.push(current);
        const prototype = current === thing ? sourcePrototype : getPrototypeOf(current);
        if (isPrototypeBoundary(current, prototype, current === thing)) break;
        const props = Object.getOwnPropertyNames(current);
        if (Object.getOwnPropertySymbols) props.push(...Object.getOwnPropertySymbols(current));
        for (const prop of props){
            if (isUnsafeObjectKey(prop)) continue;
            if (!hasOwnProperty(merged, prop)) {
                result[prop] = thing[prop];
                merged[prop] = true;
            }
        }
        current = prototype;
    }
    return result;
};
const kindOf = ((cache)=>(thing)=>{
        const str = toString.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
    })(Object.create(null));
const kindOfTest = (type)=>{
    type = type.toLowerCase();
    return (thing)=>kindOf(thing) === type;
};
const typeOfTest = (type)=>(thing)=>typeof thing === type;
/**
 * Determine if a value is a non-null object
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */ const { isArray } = Array;
/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */ const isUndefined = typeOfTest('undefined');
/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */ function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */ const isArrayBuffer = kindOfTest('ArrayBuffer');
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */ function isArrayBufferView(val) {
    let result;
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) result = ArrayBuffer.isView(val);
    else result = val && val.buffer && isArrayBuffer(val.buffer);
    return result;
}
/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */ const isString = typeOfTest('string');
/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */ const isFunction = typeOfTest('function');
/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */ const isNumber = typeOfTest('number');
/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */ const isObject = (thing)=>thing !== null && typeof thing === 'object';
/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */ const isBoolean = (thing)=>thing === true || thing === false;
/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */ const isPlainObject = (val)=>{
    if (!isObject(val)) return false;
    const prototype = getPrototypeOf(val);
    return (prototype === null || prototype === Object.prototype || getPrototypeOf(prototype) === null) && // Treat own Symbol.toStringTag or Symbol.iterator members as evidence the
    // value is tagged/iterable, ignoring members reachable only through shared
    // or terminal prototype boundaries. This is exactly what
    // hasOwnInPrototypeChain(val, prop) computes here: every prototype admitted
    // above (null, Object.prototype, or a terminal null-prototype template) is
    // a boundary, so the walk never inspects anything but `val`'s own members,
    // and stops before even those when `val` is itself the boundary
    // Object.prototype. Checking that inline avoids allocating the walker's
    // `seen` list twice per call on the mergeConfig / merge hot path.
    (isPrototypeBoundary(val, prototype, true) || !hasOwnProperty(val, toStringTag) && !hasOwnProperty(val, iterator));
};
/**
 * Determine if a value is an empty object (safely handles Buffers)
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an empty object, otherwise false
 */ const isEmptyObject = (val)=>{
    // Early return for non-objects or Buffers to prevent RangeError
    if (!isObject(val) || isBuffer(val)) return false;
    try {
        return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
    } catch (e) {
        // Fallback for any other objects that might cause RangeError with Object.keys()
        return false;
    }
};
/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */ const isDate = kindOfTest('Date');
/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */ const isFile = kindOfTest('File');
/**
 * Determine if a value is a React Native Blob
 * React Native "blob": an object with a `uri` attribute. Optionally, it can
 * also have a `name` and `type` attribute to specify filename and content type
 *
 * @see https://github.com/facebook/react-native/blob/26684cf3adf4094eb6c405d345a75bf8c7c0bf88/Libraries/Network/FormData.js#L68-L71
 *
 * @param {*} value The value to test
 *
 * @returns {boolean} True if value is a React Native Blob, otherwise false
 */ const isReactNativeBlob = (value)=>{
    return !!(value && typeof value.uri !== 'undefined');
};
/**
 * Determine if environment is React Native
 * ReactNative `FormData` has a non-standard `getParts()` method
 *
 * @param {*} formData The formData to test
 *
 * @returns {boolean} True if environment is React Native, otherwise false
 */ const isReactNative = (formData)=>formData && typeof formData.getParts !== 'undefined';
/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */ const isBlob = kindOfTest('Blob');
/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a FileList, otherwise false
 */ const isFileList = kindOfTest('FileList');
const isSet = kindOfTest('Set');
/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */ const isStream = (val)=>isObject(val) && isFunction(val.pipe);
/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */ function getGlobal() {
    if (typeof globalThis !== 'undefined') return globalThis;
    if (typeof self !== 'undefined') return self;
    if (typeof window !== 'undefined') return window;
    if (typeof global !== 'undefined') return global;
    return {};
}
const G = getGlobal();
const FormDataCtor = typeof G.FormData !== 'undefined' ? G.FormData : undefined;
const isFormData = (thing)=>{
    if (!thing) return false;
    if (FormDataCtor && thing instanceof FormDataCtor) return true;
    // Reject plain objects inheriting directly from Object.prototype so prototype-pollution gadgets can't spoof FormData.
    const proto = getPrototypeOf(thing);
    if (!proto || proto === Object.prototype) return false;
    if (!isFunction(thing.append)) return false;
    const kind = kindOf(thing);
    return kind === 'formdata' || // detect form-data instance
    kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]';
};
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */ const isURLSearchParams = kindOfTest('URLSearchParams');
const [isReadableStream, isRequest, isResponse, isHeaders] = [
    'ReadableStream',
    'Request',
    'Response',
    'Headers'
].map(kindOfTest);
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */ const trim = (str)=>{
    return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array<unknown>} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Object} [options]
 * @param {Boolean} [options.allOwnKeys = false]
 * @returns {any}
 */ function forEach(obj, fn, { allOwnKeys = false } = {}) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') return;
    let i;
    let l;
    // Force an array if not already something iterable
    if (typeof obj !== 'object') /*eslint no-param-reassign:0*/ obj = [
        obj
    ];
    if (isArray(obj)) // Iterate over array values
    for(i = 0, l = obj.length; i < l; i++)fn.call(null, obj[i], i, obj);
    else {
        // Buffer check
        if (isBuffer(obj)) return;
        // Iterate over object keys
        const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
        const len = keys.length;
        let key;
        for(i = 0; i < len; i++){
            key = keys[i];
            fn.call(null, obj[key], key, obj);
        }
    }
}
/**
 * Finds a key in an object, case-insensitive, returning the actual key name.
 * Returns null if the object is a Buffer or if no match is found.
 *
 * @param {Object} obj - The object to search.
 * @param {string} key - The key to find (case-insensitive).
 * @returns {?string} The actual key name if found, otherwise null.
 */ function findKey(obj, key) {
    if (isBuffer(obj)) return null;
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while(i-- > 0){
        _key = keys[i];
        if (key === _key.toLowerCase()) return _key;
    }
    return null;
}
const _global = (()=>{
    /*eslint no-undef:0*/ if (typeof globalThis !== 'undefined') return globalThis;
    return typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : global;
})();
const isContextDefined = (context)=>!isUndefined(context) && context !== _global;
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * const result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */ function merge(...objs) {
    const { caseless, skipUndefined } = isContextDefined(this) && this || {};
    const result = {};
    // Caseless lookup only applies to string keys — symbol keys are
    // identity-matched. Every string key that reaches `result` passes through
    // this index first, so it can never hold two case variants of one key and a
    // lowercase -> key map is exactly what findKey(result, key) would rescan
    // Object.keys(result) for on each assignment.
    const lowerCaseKeys = caseless ? Object.create(null) : null;
    const assignValue = (val, key)=>{
        // Skip dangerous property names to prevent prototype pollution
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') return;
        let targetKey = key;
        if (lowerCaseKeys && typeof key === 'string') {
            const lowerKey = key.toLowerCase();
            const knownKey = lowerCaseKeys[lowerKey];
            // A key recorded but absent from `result` was skipped by skipUndefined;
            // the later spelling wins then, as it does for findKey.
            if (knownKey !== undefined && hasOwnProperty(result, knownKey)) targetKey = knownKey;
            else lowerCaseKeys[lowerKey] = key;
        }
        // Read via own-prop only — a bare `result[targetKey]` walks the prototype
        // chain, so a polluted Object.prototype value could surface here and get
        // copied into the merged result.
        const existing = hasOwnProperty(result, targetKey) ? result[targetKey] : undefined;
        if (isPlainObject(existing) && isPlainObject(val)) result[targetKey] = merge(existing, val);
        else if (isPlainObject(val)) result[targetKey] = merge({}, val);
        else if (isArray(val)) result[targetKey] = val.slice();
        else if (!skipUndefined || !isUndefined(val)) result[targetKey] = val;
    };
    for(let i = 0, l = objs.length; i < l; i++){
        const source = objs[i];
        if (!source || isBuffer(source)) continue;
        forEach(source, assignValue);
        if (typeof source !== 'object' || isArray(source) || !Object.getOwnPropertySymbols) continue;
        const symbols = Object.getOwnPropertySymbols(source);
        for(let j = 0; j < symbols.length; j++){
            const symbol = symbols[j];
            if (propertyIsEnumerable.call(source, symbol)) assignValue(source[symbol], symbol);
        }
    }
    return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Object} [options]
 * @param {Boolean} [options.allOwnKeys]
 * @returns {Object} The resulting value of object a
 */ const extend = (a, b, thisArg, { allOwnKeys } = {})=>{
    forEach(b, (val, key)=>{
        if (thisArg && isFunction(val)) Object.defineProperty(a, key, {
            // Null-proto descriptor so a polluted Object.prototype.get cannot
            // hijack defineProperty's accessor-vs-data resolution.
            __proto__: null,
            value: (0, _bindJsDefault.default)(val, thisArg),
            writable: true,
            enumerable: true,
            configurable: true
        });
        else Object.defineProperty(a, key, {
            __proto__: null,
            value: val,
            writable: true,
            enumerable: true,
            configurable: true
        });
    }, {
        allOwnKeys
    });
    return a;
};
/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */ const stripBOM = (content)=>{
    if (content.charCodeAt(0) === 0xfeff) content = content.slice(1);
    return content;
};
/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */ const inherits = (constructor, superConstructor, props, descriptors)=>{
    constructor.prototype = Object.create(superConstructor.prototype, descriptors);
    Object.defineProperty(constructor.prototype, 'constructor', {
        __proto__: null,
        value: constructor,
        writable: true,
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(constructor, 'super', {
        __proto__: null,
        value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
};
/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */ const toFlatObject = (sourceObj, destObj, filter, propFilter)=>{
    let props;
    let i;
    let prop;
    const merged = {};
    destObj = destObj || {};
    // eslint-disable-next-line no-eq-null,eqeqeq
    if (sourceObj == null) return destObj;
    do {
        props = Object.getOwnPropertyNames(sourceObj);
        i = props.length;
        while(i-- > 0){
            prop = props[i];
            if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
                destObj[prop] = sourceObj[prop];
                merged[prop] = true;
            }
        }
        sourceObj = filter !== false && getPrototypeOf(sourceObj);
    }while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
};
/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */ const endsWith = (str, searchString, position)=>{
    str = String(str);
    if (position === undefined || position > str.length) position = str.length;
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
};
/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */ const toArray = (thing)=>{
    if (!thing) return null;
    if (isArray(thing)) return thing;
    let i = thing.length;
    if (!Number.isSafeInteger(i) || i < 0 || i > 0xffffffff) return null;
    // Bound the copy by actual indexed properties, including hidden and inherited
    // members of array-like collections, rather than by the declared length alone.
    const indexes = new Set();
    const seen = new Set();
    let source = thing;
    while(source != null && indexes.size < i){
        if (seen.has(source)) return null;
        seen.add(source);
        const prototype = getPrototypeOf(source);
        if (isPrototypeBoundary(source, prototype, source === thing)) break;
        Object.getOwnPropertyNames(source).forEach((key)=>{
            const index = +key;
            if (Number.isInteger(index) && index >= 0 && index < i && String(index) === key && hasOwnProperty(source, key)) indexes.add(index);
        });
        source = prototype;
    }
    if (indexes.size !== i) return null;
    const arr = new Array(i);
    while(i-- > 0)arr[i] = thing[i];
    return arr;
};
/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */ // eslint-disable-next-line func-names
const isTypedArray = ((TypedArray)=>{
    // eslint-disable-next-line func-names
    return (thing)=>{
        return TypedArray && thing instanceof TypedArray;
    };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));
/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */ const forEachEntry = (obj, fn)=>{
    const generator = obj && obj[iterator];
    const _iterator = generator.call(obj);
    let result;
    while((result = _iterator.next()) && !result.done){
        const pair = result.value;
        fn.call(obj, pair[0], pair[1]);
    }
};
/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */ const matchAll = (regExp, str)=>{
    let matches;
    const arr = [];
    while((matches = regExp.exec(str)) !== null)arr.push(matches);
    return arr;
};
/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */ const isHTMLForm = kindOfTest('HTMLFormElement');
const toCamelCase = (str)=>{
    return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
        return p1.toUpperCase() + p2;
    });
};
const { propertyIsEnumerable } = Object.prototype;
/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */ const isRegExp = kindOfTest('RegExp');
const reduceDescriptors = (obj, reducer)=>{
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};
    forEach(descriptors, (descriptor, name)=>{
        let ret;
        if ((ret = reducer(descriptor, name, obj)) !== false) reducedDescriptors[name] = ret || descriptor;
    });
    Object.defineProperties(obj, reducedDescriptors);
};
/**
 * Makes all methods read-only
 * @param {Object} obj
 */ const freezeMethods = (obj)=>{
    reduceDescriptors(obj, (descriptor, name)=>{
        // skip restricted props in strict mode
        if (isFunction(obj) && [
            'arguments',
            'caller',
            'callee'
        ].includes(name)) return false;
        const value = obj[name];
        if (!isFunction(value)) return;
        descriptor.enumerable = false;
        if ('writable' in descriptor) {
            descriptor.writable = false;
            return;
        }
        if (!descriptor.set) descriptor.set = ()=>{
            throw Error("Can not rewrite read-only method '" + name + "'");
        };
    });
};
/**
 * Converts an array or a delimited string into an object set with values as keys and true as values.
 * Useful for fast membership checks.
 *
 * @param {Array|string} arrayOrString - The array or string to convert.
 * @param {string} delimiter - The delimiter to use if input is a string.
 * @returns {Object} An object with keys from the array or string, values set to true.
 */ const toObjectSet = (arrayOrString, delimiter)=>{
    const obj = {};
    const define = (arr)=>{
        arr.forEach((value)=>{
            obj[value] = true;
        });
    };
    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
    return obj;
};
const noop = ()=>{};
const toFiniteNumber = (value, defaultValue)=>{
    return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */ function isSpecCompliantForm(thing) {
    return !!(thing && isFunction(thing.append) && thing[toStringTag] === 'FormData' && thing[iterator]);
}
/**
 * Recursively converts an object to a JSON-compatible object, handling circular references and Buffers.
 *
 * @param {Object} obj - The object to convert.
 * @returns {Object} The JSON-compatible object.
 */ const toJSONObject = (obj)=>{
    const visited = new WeakSet();
    const visit = (source)=>{
        if (isObject(source)) {
            if (visited.has(source)) return;
            //Buffer check
            if (isBuffer(source)) return source;
            if (!('toJSON' in source)) {
                // add-on descent / delete-on-ascent: preserves path semantics, so DAG nodes serialise at every occurrence (see #7230).
                visited.add(source);
                let target;
                if (isSet(source)) {
                    target = [];
                    for (const value of source){
                        const reducedValue = visit(value);
                        !isUndefined(reducedValue) && target.push(reducedValue);
                    }
                } else {
                    target = isArray(source) ? [] : {};
                    forEach(source, (value, key)=>{
                        const reducedValue = visit(value);
                        !isUndefined(reducedValue) && (target[key] = reducedValue);
                    });
                }
                visited.delete(source);
                return target;
            }
        }
        return source;
    };
    return visit(obj);
};
/**
 * Determines if a value is an async function.
 *
 * @param {*} thing - The value to test.
 * @returns {boolean} True if value is an async function, otherwise false.
 */ const isAsyncFn = kindOfTest('AsyncFunction');
/**
 * Determines if a value is thenable (has then and catch methods).
 *
 * @param {*} thing - The value to test.
 * @returns {boolean} True if value is thenable, otherwise false.
 */ const isThenable = (thing)=>thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
// original code
// https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34
/**
 * Provides a cross-platform setImmediate implementation.
 * Uses native setImmediate if available, otherwise falls back to postMessage or setTimeout.
 *
 * @param {boolean} setImmediateSupported - Whether setImmediate is supported.
 * @param {boolean} postMessageSupported - Whether postMessage is supported.
 * @returns {Function} A function to schedule a callback asynchronously.
 */ const _setImmediate = ((setImmediateSupported, postMessageSupported)=>{
    if (setImmediateSupported) return setImmediate;
    return postMessageSupported ? ((token, callbacks)=>{
        _global.addEventListener('message', ({ source, data })=>{
            if (source === _global && data === token) callbacks.length && callbacks.shift()();
        }, false);
        return (cb)=>{
            callbacks.push(cb);
            _global.postMessage(token, '*');
        };
    })(`axios@${Math.random()}`, []) : (cb)=>setTimeout(cb);
})(typeof setImmediate === 'function', isFunction(_global.postMessage));
/**
 * Schedules a microtask or asynchronous callback as soon as possible.
 * Uses queueMicrotask if available, otherwise falls back to process.nextTick or _setImmediate.
 *
 * @type {Function}
 */ const asap = typeof queueMicrotask !== 'undefined' ? queueMicrotask.bind(_global) : _setImmediate;
// *********************
const isIterable = (thing)=>thing != null && isFunction(thing[iterator]);
/**
 * Determine if a value is iterable via an iterator that is NOT sourced solely
 * from a polluted Object.prototype. Use this instead of `isIterable` whenever
 * the iterable comes from untrusted input (e.g. user-supplied header sources),
 * so `Object.prototype[Symbol.iterator] = ...` cannot turn an ordinary object
 * into an attacker-controlled entries iterator.
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value has a non-polluted iterator
 */ const isSafeIterable = (thing)=>thing != null && hasOwnInPrototypeChain(thing, iterator) && isIterable(thing);
exports.default = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isEmptyObject,
    isReadableStream,
    isRequest,
    isResponse,
    isHeaders,
    isUndefined,
    isDate,
    isFile,
    isReactNativeBlob,
    isReactNative,
    isBlob,
    isRegExp,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    hasOwnInPrototypeChain,
    getSafeProp,
    toSafeFlatObject,
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable,
    setImmediate: _setImmediate,
    asap,
    isIterable,
    isSafeIterable
};

},{"./helpers/bind.js":"9J3iM","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"9J3iM":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>bind);
'use strict';
function bind(fn, thisArg) {
    return function wrap() {
        return fn.apply(thisArg, arguments);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"23fNz":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"7TfP2":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _buildURLJs = require("../helpers/buildURL.js");
var _buildURLJsDefault = parcelHelpers.interopDefault(_buildURLJs);
var _interceptorManagerJs = require("./InterceptorManager.js");
var _interceptorManagerJsDefault = parcelHelpers.interopDefault(_interceptorManagerJs);
var _dispatchRequestJs = require("./dispatchRequest.js");
var _dispatchRequestJsDefault = parcelHelpers.interopDefault(_dispatchRequestJs);
var _mergeConfigJs = require("./mergeConfig.js");
var _mergeConfigJsDefault = parcelHelpers.interopDefault(_mergeConfigJs);
var _buildFullPathJs = require("./buildFullPath.js");
var _buildFullPathJsDefault = parcelHelpers.interopDefault(_buildFullPathJs);
var _methodListJs = require("./methodList.js");
var _methodListJsDefault = parcelHelpers.interopDefault(_methodListJs);
var _validatorJs = require("../helpers/validator.js");
var _validatorJsDefault = parcelHelpers.interopDefault(_validatorJs);
var _axiosHeadersJs = require("./AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
var _transitionalJs = require("../defaults/transitional.js");
var _transitionalJsDefault = parcelHelpers.interopDefault(_transitionalJs);
var _axiosErrorJs = require("./AxiosError.js");
'use strict';
const validators = (0, _validatorJsDefault.default).validators;
// Recognize header maps without consuming objects intended as literal values.
// AxiosHeaders from other builds share a brand and header-container interface,
// but not constructor identity. A tag and toJSON alone can describe a literal.
const isHeadersBucket = (value)=>{
    if (value == null || (0, _utilsJsDefault.default).isPlainObject(value) || value instanceof (0, _axiosHeadersJsDefault.default)) return true;
    try {
        return (0, _utilsJsDefault.default).isObject(value) && (0, _utilsJsDefault.default).getSafeProp(value, Symbol.toStringTag) === 'AxiosHeaders' && [
            'toJSON',
            'set',
            'get',
            'has',
            'delete',
            'clear',
            'normalize',
            'concat',
            'toString',
            Symbol.iterator
        ].every((method)=>(0, _utilsJsDefault.default).isFunction((0, _utilsJsDefault.default).getSafeProp(value, method)));
    } catch (e) {
        // A failed optional brand probe must not prevent literal header serialization.
        return false;
    }
};
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */ class Axios {
    constructor(instanceConfig){
        this.defaults = instanceConfig || {};
        this.interceptors = {
            request: new (0, _interceptorManagerJsDefault.default)(),
            response: new (0, _interceptorManagerJsDefault.default)()
        };
    }
    /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */ async request(configOrUrl, config) {
        try {
            return await this._request(configOrUrl, config);
        } catch (err) {
            if (err instanceof Error) try {
                let dummy = {};
                Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
                const dummyStack = dummy.stack;
                let stack = '';
                // slice off the Error: ... line
                if (typeof dummyStack === 'string') {
                    const firstNewlineIndex = dummyStack.indexOf('\n');
                    stack = firstNewlineIndex === -1 ? '' : dummyStack.slice(firstNewlineIndex + 1);
                }
                if (!err.stack) err.stack = stack;
                else if (stack) {
                    // Match a common suffix after the 2 top frames when available,
                    // otherwise compare the full reconstructed stack.
                    const firstNewlineIndex = stack.indexOf('\n');
                    const secondNewlineIndex = firstNewlineIndex === -1 ? -1 : stack.indexOf('\n', firstNewlineIndex + 1);
                    const duplicateCheckSuffix = secondNewlineIndex === -1 ? stack : stack.slice(secondNewlineIndex + 1);
                    // `AxiosError.from()` may have already inlined the wrapped error's
                    // stack under a `Caused by:` marker. Keep the reconstructed caller
                    // frames ahead of that marker so stack-only reporters do not read
                    // them as part of the low-level cause.
                    const currentStack = String(err.stack);
                    const causeIndex = (0, _axiosErrorJs.getCauseStackIndex)(err, currentStack);
                    const stackHead = causeIndex === -1 ? currentStack : currentStack.slice(0, causeIndex);
                    const causeSection = causeIndex === -1 ? '' : currentStack.slice(causeIndex);
                    if (!stackHead.endsWith(duplicateCheckSuffix)) err.stack = stackHead + '\n' + stack + causeSection;
                }
            } catch (e) {
            // Ignore failures from custom stack hooks or un-writable stack properties.
            }
            throw err;
        }
    }
    _request(configOrUrl, config) {
        /*eslint no-param-reassign:0*/ // Allow for axios('example/url'[, config]) a la fetch API
        if (typeof configOrUrl === 'string') {
            config = config || {};
            config.url = configOrUrl;
        } else config = configOrUrl || {};
        config = (0, _mergeConfigJsDefault.default)(this.defaults, config);
        const { transitional, paramsSerializer, headers } = config;
        if (transitional !== undefined) (0, _validatorJsDefault.default).assertOptions(transitional, {
            silentJSONParsing: validators.transitional(validators.boolean),
            forcedJSONParsing: validators.transitional(validators.boolean),
            clarifyTimeoutError: validators.transitional(validators.boolean),
            legacyInterceptorReqResOrdering: validators.transitional(validators.boolean),
            advertiseZstdAcceptEncoding: validators.transitional(validators.boolean),
            validateStatusUndefinedResolves: validators.transitional(validators.boolean),
            encodeBasicAuthUsername: validators.transitional(validators.boolean)
        }, false);
        if (paramsSerializer != null) {
            if ((0, _utilsJsDefault.default).isFunction(paramsSerializer)) config.paramsSerializer = {
                serialize: paramsSerializer
            };
            else (0, _validatorJsDefault.default).assertOptions(paramsSerializer, {
                encode: validators.function,
                serialize: validators.function
            }, true);
        }
        // Set config.allowAbsoluteUrls
        if (config.allowAbsoluteUrls !== undefined) ;
        else if ((0, _utilsJsDefault.default).hasOwnProp(this.defaults, 'allowAbsoluteUrls') && this.defaults.allowAbsoluteUrls !== undefined) config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
        else config.allowAbsoluteUrls = true;
        (0, _validatorJsDefault.default).assertOptions(config, {
            baseUrl: validators.spelling('baseURL'),
            withXsrfToken: validators.spelling('withXSRFToken')
        }, true);
        // Set config.method
        config.method = ((0, _utilsJsDefault.default).getSafeProp(config, 'method') || (0, _utilsJsDefault.default).getSafeProp(this.defaults, 'method') || 'get').toLowerCase();
        // Flatten header defaults without consuming literal method-named headers.
        const commonHeaders = (0, _utilsJsDefault.default).getSafeProp(headers, 'common');
        const methodHeaders = (0, _utilsJsDefault.default).getSafeProp(headers, config.method);
        const contextHeaders = headers && (0, _utilsJsDefault.default).merge(isHeadersBucket(commonHeaders) ? commonHeaders : undefined, isHeadersBucket(methodHeaders) ? methodHeaders : undefined);
        headers && (0, _utilsJsDefault.default).forEach((0, _methodListJsDefault.default).concat('common'), (method)=>{
            if (isHeadersBucket((0, _utilsJsDefault.default).getSafeProp(headers, method))) delete headers[method];
        });
        config.headers = (0, _axiosHeadersJsDefault.default).concat(contextHeaders, headers);
        // filter out skipped interceptors
        const requestInterceptorChain = [];
        let synchronousRequestInterceptors = true;
        this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
            if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) return;
            synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
            const transitional = config.transitional || (0, _transitionalJsDefault.default);
            const legacyInterceptorReqResOrdering = transitional && transitional.legacyInterceptorReqResOrdering;
            if (legacyInterceptorReqResOrdering) requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
            else requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
        });
        const responseInterceptorChain = [];
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
            responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
        });
        let promise;
        let i = 0;
        let len;
        if (!synchronousRequestInterceptors) {
            const chain = [
                (0, _dispatchRequestJsDefault.default).bind(this),
                undefined
            ];
            chain.unshift(...requestInterceptorChain);
            chain.push(...responseInterceptorChain);
            len = chain.length;
            promise = Promise.resolve(config);
            while(i < len)promise = promise.then(chain[i++], chain[i++]);
            return promise;
        }
        len = requestInterceptorChain.length;
        let newConfig = config;
        while(i < len){
            const onFulfilled = requestInterceptorChain[i++];
            const onRejected = requestInterceptorChain[i++];
            try {
                newConfig = onFulfilled ? onFulfilled(newConfig) : newConfig;
            } catch (error) {
                if (!onRejected) {
                    promise = Promise.reject(error);
                    break;
                }
                try {
                    const rejectedResult = onRejected.call(this, error);
                    if ((0, _utilsJsDefault.default).isThenable(rejectedResult)) promise = Promise.resolve(rejectedResult).then(()=>(0, _dispatchRequestJsDefault.default).call(this, newConfig));
                } catch (rejectedError) {
                    promise = Promise.reject(rejectedError);
                }
                break;
            }
        }
        if (!promise) try {
            promise = (0, _dispatchRequestJsDefault.default).call(this, newConfig);
        } catch (error) {
            promise = Promise.reject(error);
        }
        i = 0;
        len = responseInterceptorChain.length;
        while(i < len)promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
        return promise;
    }
    getUri(config) {
        config = (0, _mergeConfigJsDefault.default)(this.defaults, config);
        const fullPath = (0, _buildFullPathJsDefault.default)(config.baseURL, config.url, config.allowAbsoluteUrls, config);
        return (0, _buildURLJsDefault.default)(fullPath, config.params, config.paramsSerializer);
    }
}
// Provide aliases for supported request methods
(0, _utilsJsDefault.default).forEach([
    'delete',
    'get',
    'head',
    'options'
], function forEachMethodNoData(method) {
    /*eslint func-names:0*/ Axios.prototype[method] = async function(url, config) {
        return this.request((0, _mergeConfigJsDefault.default)(config || {}, {
            method,
            url,
            data: config && (0, _utilsJsDefault.default).hasOwnProp(config, 'data') ? config.data : undefined
        }));
    };
});
(0, _utilsJsDefault.default).forEach([
    'post',
    'put',
    'patch',
    'query'
], function forEachMethodWithData(method) {
    function generateHTTPMethod(isForm) {
        return async function httpMethod(url, data, config) {
            return this.request((0, _mergeConfigJsDefault.default)(config || {}, {
                method,
                headers: isForm ? {
                    'Content-Type': 'multipart/form-data'
                } : {},
                url,
                data
            }));
        };
    }
    Axios.prototype[method] = generateHTTPMethod();
    // QUERY is a safe/idempotent read method; multipart form bodies don't fit
    // its semantics, so no queryForm shorthand is generated.
    if (method !== 'query') Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});
exports.default = Axios;

},{"../utils.js":"3iykr","../helpers/buildURL.js":"5tRJE","./InterceptorManager.js":"5kgCt","./dispatchRequest.js":"3o4wn","./mergeConfig.js":"5u78U","./buildFullPath.js":"abv3S","./methodList.js":"lsByC","../helpers/validator.js":"2qbsU","./AxiosHeaders.js":"47lYE","../defaults/transitional.js":"8cBkP","./AxiosError.js":"1ZnKZ","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"5tRJE":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * It replaces URL-encoded forms of `:`, `$`, `,`, and spaces with
 * their plain counterparts (`:`, `$`, `,`, `+`).
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */ parcelHelpers.export(exports, "encode", ()=>encode);
parcelHelpers.export(exports, "default", ()=>buildURL);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosURLSearchParamsJs = require("./AxiosURLSearchParams.js");
var _axiosURLSearchParamsJsDefault = parcelHelpers.interopDefault(_axiosURLSearchParamsJs);
'use strict';
function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+');
}
function buildURL(url, params, options) {
    if (!params) return url;
    url = url || '';
    const _options = (0, _utilsJsDefault.default).isFunction(options) ? {
        serialize: options
    } : options;
    // Read serializer options pollution-safely: own properties and methods on a
    // class/template prototype are honored, but values injected onto a polluted
    // Object.prototype are ignored.
    const _encode = (0, _utilsJsDefault.default).getSafeProp(_options, 'encode') || encode;
    const serializeFn = (0, _utilsJsDefault.default).getSafeProp(_options, 'serialize');
    let serializedParams;
    if (serializeFn) serializedParams = serializeFn(params, _options);
    else serializedParams = (0, _utilsJsDefault.default).isURLSearchParams(params) ? params.toString() : new (0, _axiosURLSearchParamsJsDefault.default)(params, _options).toString(_encode);
    if (serializedParams) {
        const hashmarkIndex = url.indexOf('#');
        if (hashmarkIndex !== -1) url = url.slice(0, hashmarkIndex);
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
}

},{"../utils.js":"3iykr","./AxiosURLSearchParams.js":"k8E7Y","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"k8E7Y":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _toFormDataJs = require("./toFormData.js");
var _toFormDataJsDefault = parcelHelpers.interopDefault(_toFormDataJs);
'use strict';
/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */ function encode(str) {
    const charMap = {
        '!': '%21',
        "'": '%27',
        '(': '%28',
        ')': '%29',
        '~': '%7E',
        '%20': '+'
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20/g, function replacer(match) {
        return charMap[match];
    });
}
/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */ function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && (0, _toFormDataJsDefault.default)(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
    this._pairs.push([
        name,
        value
    ]);
};
prototype.toString = function toString(encoder) {
    const _encode = encoder ? (value)=>encoder.call(this, value, encode) : encode;
    return this._pairs.map(function each(pair) {
        return _encode(pair[0]) + '=' + _encode(pair[1]);
    }, '').join('&');
};
exports.default = AxiosURLSearchParams;

},{"./toFormData.js":"gd6fR","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"gd6fR":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DEFAULT_FORM_DATA_MAX_DEPTH", ()=>DEFAULT_FORM_DATA_MAX_DEPTH);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
// temporary hotfix to avoid circular references until AxiosURLSearchParams is refactored
var _formDataJs = require("../platform/node/classes/FormData.js");
var _formDataJsDefault = parcelHelpers.interopDefault(_formDataJs);
var _bufferJs = require("../platform/node/classes/Buffer.js");
var _bufferJsDefault = parcelHelpers.interopDefault(_bufferJs);
'use strict';
const DEFAULT_FORM_DATA_MAX_DEPTH = 100;
/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */ function isVisitable(thing) {
    return (0, _utilsJsDefault.default).isPlainObject(thing) || (0, _utilsJsDefault.default).isArray(thing);
}
/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */ function removeBrackets(key) {
    return (0, _utilsJsDefault.default).endsWith(key, '[]') ? key.slice(0, -2) : key;
}
/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */ function renderKey(path, key, dots) {
    if (!path) return key;
    return path.concat(key).map(function each(token, i) {
        // eslint-disable-next-line no-param-reassign
        token = removeBrackets(token);
        return !dots && i ? '[' + token + ']' : token;
    }).join(dots ? '.' : '');
}
/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */ function isFlatArray(arr) {
    return (0, _utilsJsDefault.default).isArray(arr) && !arr.some(isVisitable);
}
const predicates = (0, _utilsJsDefault.default).toFlatObject((0, _utilsJsDefault.default), {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop);
});
/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/ /**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */ function toFormData(obj, formData, options) {
    if (!(0, _utilsJsDefault.default).isObject(obj)) throw new TypeError('target must be an object');
    // eslint-disable-next-line no-param-reassign
    formData = formData || new ((0, _formDataJsDefault.default) || FormData)();
    const option = (name, fallback)=>{
        const value = (0, _utilsJsDefault.default).getSafeProp(options, name);
        return (0, _utilsJsDefault.default).isUndefined(value) ? fallback : value;
    };
    const metaTokens = option('metaTokens', true);
    // eslint-disable-next-line no-use-before-define
    const visitor = option('visitor') || defaultVisitor;
    const dots = option('dots', false);
    const indexes = option('indexes', false);
    const _Blob = option('Blob') || typeof Blob !== 'undefined' && Blob;
    const maxDepth = option('maxDepth', DEFAULT_FORM_DATA_MAX_DEPTH);
    const useBlob = _Blob && (0, _utilsJsDefault.default).isSpecCompliantForm(formData);
    const stack = [];
    if (!(0, _utilsJsDefault.default).isFunction(visitor)) throw new TypeError('visitor must be a function');
    function convertValue(value) {
        if (value === null) return '';
        if ((0, _utilsJsDefault.default).isDate(value)) return value.toISOString();
        if ((0, _utilsJsDefault.default).isBoolean(value)) return value.toString();
        if (!useBlob && (0, _utilsJsDefault.default).isBlob(value)) throw new (0, _axiosErrorJsDefault.default)('Blob is not supported. Use a Buffer instead.');
        if ((0, _utilsJsDefault.default).isArrayBuffer(value) || (0, _utilsJsDefault.default).isTypedArray(value)) {
            if (useBlob && typeof _Blob === 'function') return new _Blob([
                value
            ]);
            if ((0, _bufferJsDefault.default) && (0, _bufferJsDefault.default).isBufferAvailable()) return (0, _bufferJsDefault.default).from(value);
            throw new (0, _axiosErrorJsDefault.default)('Blob is not supported. Use a Buffer instead.', (0, _axiosErrorJsDefault.default).ERR_NOT_SUPPORT);
        }
        return value;
    }
    function throwIfMaxDepthExceeded(depth) {
        if (depth > maxDepth) throw new (0, _axiosErrorJsDefault.default)('Object is too deeply nested (' + depth + ' levels). Max depth: ' + maxDepth, (0, _axiosErrorJsDefault.default).ERR_FORM_DATA_DEPTH_EXCEEDED);
    }
    function stringifyWithDepthLimit(value, depth) {
        if (maxDepth === Infinity) return JSON.stringify(value);
        const ancestors = [];
        return JSON.stringify(value, function limitDepth(_key, currentValue) {
            if (!(0, _utilsJsDefault.default).isObject(currentValue)) return currentValue;
            while(ancestors.length && ancestors[ancestors.length - 1] !== this)ancestors.pop();
            ancestors.push(currentValue);
            throwIfMaxDepthExceeded(depth + ancestors.length - 1);
            return currentValue;
        });
    }
    /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */ function defaultVisitor(value, key, path) {
        let arr = value;
        if ((0, _utilsJsDefault.default).isReactNative(formData) && (0, _utilsJsDefault.default).isReactNativeBlob(value)) {
            formData.append(renderKey(path, key, dots), convertValue(value));
            return false;
        }
        if (value && !path && typeof value === 'object') {
            if ((0, _utilsJsDefault.default).endsWith(key, '{}')) {
                // eslint-disable-next-line no-param-reassign
                key = metaTokens ? key : key.slice(0, -2);
                // eslint-disable-next-line no-param-reassign
                value = stringifyWithDepthLimit(value, 1);
            } else if ((0, _utilsJsDefault.default).isArray(value) && isFlatArray(value) || ((0, _utilsJsDefault.default).isFileList(value) || (0, _utilsJsDefault.default).endsWith(key, '[]')) && (arr = (0, _utilsJsDefault.default).toArray(value))) {
                // eslint-disable-next-line no-param-reassign
                key = removeBrackets(key);
                arr.forEach(function each(el, index) {
                    !((0, _utilsJsDefault.default).isUndefined(el) || el === null) && formData.append(// eslint-disable-next-line no-nested-ternary
                    indexes === true ? renderKey([
                        key
                    ], index, dots) : indexes === null ? key : key + '[]', convertValue(el));
                });
                return false;
            }
        }
        if (isVisitable(value)) return true;
        formData.append(renderKey(path, key, dots), convertValue(value));
        return false;
    }
    const exposedHelpers = Object.assign(predicates, {
        defaultVisitor,
        convertValue,
        isVisitable
    });
    function build(value, path, depth = 0) {
        if ((0, _utilsJsDefault.default).isUndefined(value)) return;
        throwIfMaxDepthExceeded(depth);
        if (stack.indexOf(value) !== -1) throw new Error('Circular reference detected in ' + path.join('.'));
        stack.push(value);
        (0, _utilsJsDefault.default).forEach(value, function each(el, key) {
            const result = !((0, _utilsJsDefault.default).isUndefined(el) || el === null) && visitor.call(formData, el, (0, _utilsJsDefault.default).isString(key) ? key.trim() : key, path, exposedHelpers);
            if (result === true) build(el, path ? path.concat(key) : [
                key
            ], depth + 1);
        });
        stack.pop();
    }
    if (!(0, _utilsJsDefault.default).isObject(obj)) throw new TypeError('data must be an object');
    build(obj);
    return formData;
}
exports.default = toFormData;

},{"../utils.js":"3iykr","../core/AxiosError.js":"1ZnKZ","../platform/node/classes/FormData.js":"dcPdz","../platform/node/classes/Buffer.js":"dcPdz","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"1ZnKZ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "REDACTED", ()=>REDACTED);
parcelHelpers.export(exports, "CAUSED_BY_SEPARATOR", ()=>CAUSED_BY_SEPARATOR);
// Match the section we appended, not marker-like text in an error message or
// a replacement stack supplied by the caller. Do not re-read the cause's stack.
parcelHelpers.export(exports, "getCauseStackIndex", ()=>getCauseStackIndex);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosHeadersJs = require("./AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
'use strict';
const REDACTED = '[REDACTED ****]';
function hasOwnOrPrototypeToJSON(source) {
    if ((0, _utilsJsDefault.default).hasOwnProp(source, 'toJSON')) return true;
    let prototype = Object.getPrototypeOf(source);
    while(prototype && prototype !== Object.prototype){
        if ((0, _utilsJsDefault.default).hasOwnProp(prototype, 'toJSON')) return true;
        prototype = Object.getPrototypeOf(prototype);
    }
    return false;
}
// Build a plain-object snapshot of `config` and replace the value of any key
// (case-insensitive) listed in `redactKeys` with REDACTED. Walks through arrays
// and AxiosHeaders, and short-circuits on circular references.
function redactConfig(config, redactKeys) {
    const lowerKeys = new Set(redactKeys.map((k)=>String(k).toLowerCase()));
    const seen = [];
    const visit = (source)=>{
        if (source === null || typeof source !== 'object') return source;
        if ((0, _utilsJsDefault.default).isBuffer(source)) return source;
        if (seen.indexOf(source) !== -1) return undefined;
        if (source instanceof (0, _axiosHeadersJsDefault.default)) source = source.toJSON();
        seen.push(source);
        let result;
        if ((0, _utilsJsDefault.default).isArray(source)) {
            result = [];
            source.forEach((v, i)=>{
                const reducedValue = visit(v);
                if (!(0, _utilsJsDefault.default).isUndefined(reducedValue)) result[i] = reducedValue;
            });
        } else {
            if (!(0, _utilsJsDefault.default).isPlainObject(source) && hasOwnOrPrototypeToJSON(source)) {
                seen.pop();
                return source;
            }
            result = Object.create(null);
            for (const [key, value] of Object.entries(source)){
                const reducedValue = lowerKeys.has(key.toLowerCase()) ? REDACTED : visit(value);
                if (!(0, _utilsJsDefault.default).isUndefined(reducedValue)) result[key] = reducedValue;
            }
        }
        seen.pop();
        return result;
    };
    return visit(config);
}
function stringifySafely(value) {
    try {
        return String(value);
    } catch (err) {
        return '';
    }
}
function aggregateErrorMessage(error) {
    const message = error.errors.map((entry)=>{
        try {
            return entry && entry.message ? stringifySafely(entry.message) : stringifySafely(entry);
        } catch (err) {
            return '';
        }
    }).filter(Boolean).join('; ');
    return message || error.name || 'AggregateError';
}
const CAUSED_BY_SEPARATOR = '\nCaused by: ';
const $causeStack = Symbol('causeStack');
function getCauseStackIndex(error, stack) {
    const causeStack = (0, _utilsJsDefault.default).hasOwnProp(error, $causeStack) && error[$causeStack];
    return causeStack && stack.endsWith(causeStack) ? stack.length - causeStack.length : -1;
}
/**
 * Append the stack of a wrapped error to `target.stack`.
 *
 * `cause` already exposes the original error for tooling that walks the standard
 * cause chain, but many error reporters read `stack` and nothing else. Inlining
 * the wrapped stack there means those reporters surface the underlying failure
 * instead of the axios frames that normalized it (see #6670).
 *
 * Every read is defensive: a custom `Error.prepareStackTrace` hook, a runtime
 * without stack support, or a replaced `stack` property can leave the value
 * missing, non-string, or read-only, and normalizing an error must not throw
 * because of that.
 *
 * @param {Error} target The AxiosError being built.
 * @param {Error} source The error being wrapped.
 *
 * @returns {void}
 */ function appendCauseStack(target, source) {
    try {
        const sourceStack = source && source.stack;
        if (typeof sourceStack !== 'string' || !sourceStack) return;
        const targetStack = target.stack;
        if (typeof targetStack !== 'string' || !targetStack) return;
        // Each call to `from()` creates a fresh target. Re-wrapping includes the
        // previous stack verbatim, adding one cause section per wrap.
        const causeStack = CAUSED_BY_SEPARATOR + sourceStack;
        target.stack = targetStack + causeStack;
        Object.defineProperty(target, $causeStack, {
            __proto__: null,
            value: causeStack
        });
    } catch (e) {
    // Ignore failures from custom stack hooks or un-writable stack properties.
    }
}
class AxiosError extends Error {
    static from(error, code, config, request, response, customProps) {
        // `AggregateError` (thrown by Node on dual-stack/Happy-Eyeballs connection
        // failures) has an empty `message`; its detail lives in `errors[]`. Without
        // this, the wrapped error surfaces with a blank message (see #6721).
        let message = error.message;
        if (!message && (0, _utilsJsDefault.default).isArray(error.errors) && error.errors.length) message = aggregateErrorMessage(error);
        const axiosError = new AxiosError(message, code || error.code, config, request, response);
        // Match native `Error` `cause` semantics: non-enumerable. The wrapped
        // error often carries circular internals (sockets, requests, agents), so
        // an enumerable `cause` makes structured loggers (pino/winston) and any
        // own-property walk throw "Converting circular structure to JSON".
        // Regression from #6982; see #7205. `__proto__: null` mirrors the
        // `message` descriptor below (prototype-pollution-safe descriptor).
        Object.defineProperty(axiosError, 'cause', {
            __proto__: null,
            value: error,
            writable: true,
            enumerable: false,
            configurable: true
        });
        axiosError.name = error.name;
        // Inline the wrapped stack for reporters that read only `stack`; the `cause`
        // property above already covers cause-aware tooling.
        appendCauseStack(axiosError, error);
        // Preserve status from the original error if not already set from response
        if (error.status != null && axiosError.status == null) axiosError.status = error.status;
        customProps && Object.assign(axiosError, customProps);
        return axiosError;
    }
    /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */ constructor(message, code, config, request, response){
        super(message);
        // Make message enumerable to maintain backward compatibility
        // The native Error constructor sets message as non-enumerable,
        // but axios < v1.13.3 had it as enumerable
        Object.defineProperty(this, 'message', {
            // Null-proto descriptor so a polluted Object.prototype.get cannot turn
            // this data descriptor into an accessor descriptor on the way in.
            __proto__: null,
            value: message,
            enumerable: true,
            writable: true,
            configurable: true
        });
        this.name = 'AxiosError';
        this.isAxiosError = true;
        code && (this.code = code);
        config && (this.config = config);
        request && (this.request = request);
        if (response) {
            this.response = response;
            this.status = response.status;
        }
    }
    toJSON() {
        // Opt-in redaction: when the request config carries a `redact` array, the
        // value of any matching key (case-insensitive, at any depth) is replaced
        // with REDACTED in the serialized snapshot. Undefined or empty leaves the
        // existing serialization behavior unchanged.
        const config = this.config;
        const redactKeys = config && (0, _utilsJsDefault.default).hasOwnProp(config, 'redact') ? config.redact : undefined;
        const serializedConfig = (0, _utilsJsDefault.default).isArray(redactKeys) && redactKeys.length > 0 ? redactConfig(config, redactKeys) : (0, _utilsJsDefault.default).toJSONObject(config);
        return {
            // Standard
            message: this.message,
            name: this.name,
            // Microsoft
            description: this.description,
            number: this.number,
            // Mozilla
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            // Axios
            config: serializedConfig,
            code: this.code,
            status: this.status
        };
    }
}
// This can be changed to static properties as soon as the parser options in .eslint.cjs are updated.
AxiosError.ERR_BAD_OPTION_VALUE = 'ERR_BAD_OPTION_VALUE';
AxiosError.ERR_BAD_OPTION = 'ERR_BAD_OPTION';
AxiosError.ECONNABORTED = 'ECONNABORTED';
AxiosError.ETIMEDOUT = 'ETIMEDOUT';
AxiosError.ECONNREFUSED = 'ECONNREFUSED';
AxiosError.ERR_NETWORK = 'ERR_NETWORK';
AxiosError.ERR_FR_TOO_MANY_REDIRECTS = 'ERR_FR_TOO_MANY_REDIRECTS';
AxiosError.ERR_DEPRECATED = 'ERR_DEPRECATED';
AxiosError.ERR_BAD_RESPONSE = 'ERR_BAD_RESPONSE';
AxiosError.ERR_BAD_REQUEST = 'ERR_BAD_REQUEST';
AxiosError.ERR_CANCELED = 'ERR_CANCELED';
AxiosError.ERR_NOT_SUPPORT = 'ERR_NOT_SUPPORT';
AxiosError.ERR_INVALID_URL = 'ERR_INVALID_URL';
AxiosError.ERR_FORM_DATA_DEPTH_EXCEEDED = 'ERR_FORM_DATA_DEPTH_EXCEEDED';
exports.default = AxiosError;

},{"../utils.js":"3iykr","./AxiosHeaders.js":"47lYE","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"47lYE":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _parseHeadersJs = require("../helpers/parseHeaders.js");
var _parseHeadersJsDefault = parcelHelpers.interopDefault(_parseHeadersJs);
var _sanitizeHeaderValueJs = require("../helpers/sanitizeHeaderValue.js");
'use strict';
const $internals = Symbol('internals');
function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
    if (value === false || value == null) return value;
    return (0, _utilsJsDefault.default).isArray(value) ? value.map(normalizeValue) : (0, _sanitizeHeaderValueJs.sanitizeHeaderValue)(String(value));
}
function parseTokens(str) {
    const tokens = Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;
    while(match = tokensRE.exec(str))tokens[match[1]] = match[2];
    return tokens;
}
const parameterNameRE = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function trimOWS(value) {
    let start = 0;
    let end = value.length;
    while(start < end){
        const code = value.charCodeAt(start);
        if (code !== 0x09 && code !== 0x20) break;
        start += 1;
    }
    while(end > start){
        const code = value.charCodeAt(end - 1);
        if (code !== 0x09 && code !== 0x20) break;
        end -= 1;
    }
    return start === 0 && end === value.length ? value : value.slice(start, end);
}
function decodeQuotedString(value) {
    const last = value.length - 1;
    if (last < 1 || value.charCodeAt(0) !== 0x22 || value.charCodeAt(last) !== 0x22) return value;
    let decoded = '';
    for(let i = 1; i < last; i++){
        const code = value.charCodeAt(i);
        if (code === 0x22) return value;
        if (code === 0x5c) {
            i += 1;
            if (i >= last) return value;
        }
        decoded += value[i];
    }
    return decoded;
}
function parseParameters(value) {
    const parameters = Object.create(null);
    const str = String(value);
    let start = 0;
    let quoted = false;
    let escaped = false;
    function parseParameter(end) {
        const part = trimOWS(str.slice(start, end));
        const equals = part.indexOf('=');
        if (equals < 1) return;
        const name = trimOWS(part.slice(0, equals));
        if (!parameterNameRE.test(name)) return;
        const normalizedName = name.toLowerCase();
        if (normalizedName === '__proto__' || normalizedName === 'constructor' || normalizedName === 'prototype') return;
        const parameterValue = trimOWS(part.slice(equals + 1));
        parameters[normalizedName] = decodeQuotedString(parameterValue);
    }
    for(let i = 0; i < str.length; i++){
        const code = str.charCodeAt(i);
        if (quoted) {
            if (escaped) escaped = false;
            else if (code === 0x5c) escaped = true;
            else if (code === 0x22) quoted = false;
        } else if (code === 0x22) quoted = true;
        else if (code === 0x2c || code === 0x3b) {
            parseParameter(i);
            start = i + 1;
        }
    }
    parseParameter(str.length);
    return parameters;
}
const isValidHeaderName = (str)=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
// `__proto__` is a valid field name, and the one name the uppercase mapping at
// the bottom of this file cannot reach: it is inherited from Object.prototype
// instead of being declared on AxiosHeaders.prototype, so `self.__proto__ = v`
// runs the inherited setter. That silently discards the header, and an array
// value replaces the instance prototype, taking every method with it.
// Store it under the same kind of case variant that mapping uses for `set` and
// `constructor`. Header lookup is caseless, so it reads back under either
// spelling, and no own `__proto__` slot is ever created for a later
// `Object.assign` to copy onto a plain object through the same setter.
const PROTO_HEADER_SLOT = '__Proto__';
const headerSlot = (name)=>name === '__proto__' ? PROTO_HEADER_SLOT : name;
function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
    if ((0, _utilsJsDefault.default).isFunction(filter)) return filter.call(context, value, header);
    if (isHeaderNameFilter) value = header;
    if (!(0, _utilsJsDefault.default).isString(value)) return;
    if ((0, _utilsJsDefault.default).isString(filter)) return value.indexOf(filter) !== -1;
    if ((0, _utilsJsDefault.default).isRegExp(filter)) return filter.test(value);
}
function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str)=>{
        return char.toUpperCase() + str;
    });
}
function buildAccessors(obj, header) {
    const accessorName = (0, _utilsJsDefault.default).toCamelCase(' ' + header);
    [
        'get',
        'set',
        'has'
    ].forEach((methodName)=>{
        Object.defineProperty(obj, methodName + accessorName, {
            // Null-proto descriptor so a polluted Object.prototype.get cannot turn
            // this data descriptor into an accessor descriptor on the way in.
            __proto__: null,
            value: function(arg1, arg2, arg3) {
                return this[methodName].call(this, header, arg1, arg2, arg3);
            },
            configurable: true
        });
    });
}
class AxiosHeaders {
    constructor(headers){
        headers && this.set(headers);
    }
    set(header, valueOrRewrite, rewrite) {
        const self = this;
        function setHeader(_value, _header, _rewrite) {
            const lHeader = normalizeHeader(_header);
            if (!lHeader) return;
            const key = (0, _utilsJsDefault.default).findKey(self, lHeader);
            if (!key || self[key] === undefined || _rewrite === true || _rewrite === undefined && self[key] !== false) self[headerSlot(key || _header)] = normalizeValue(_value);
        }
        const setHeaders = (headers, _rewrite)=>(0, _utilsJsDefault.default).forEach(headers, (_value, _header)=>setHeader(_value, _header, _rewrite));
        if ((0, _utilsJsDefault.default).isPlainObject(header) || header instanceof this.constructor) setHeaders(header, valueOrRewrite);
        else if ((0, _utilsJsDefault.default).isString(header) && (header = header.trim()) && !isValidHeaderName(header)) setHeaders((0, _parseHeadersJsDefault.default)(header), valueOrRewrite);
        else if ((0, _utilsJsDefault.default).isObject(header) && (0, _utilsJsDefault.default).isSafeIterable(header)) {
            let obj = Object.create(null), dest, key;
            for (const entry of header){
                if (!(0, _utilsJsDefault.default).isArray(entry)) throw new TypeError('Object iterator must return a key-value pair');
                key = entry[0];
                if ((0, _utilsJsDefault.default).hasOwnProp(obj, key)) {
                    dest = obj[key];
                    obj[key] = (0, _utilsJsDefault.default).isArray(dest) ? [
                        ...dest,
                        entry[1]
                    ] : [
                        dest,
                        entry[1]
                    ];
                } else obj[key] = entry[1];
            }
            setHeaders(obj, valueOrRewrite);
        } else header != null && setHeader(valueOrRewrite, header, rewrite);
        return this;
    }
    get(header, parser) {
        header = normalizeHeader(header);
        if (header) {
            const key = (0, _utilsJsDefault.default).findKey(this, header);
            if (key) {
                const value = this[key];
                if (!parser) return value;
                if (parser === true) return parseTokens(value);
                if ((0, _utilsJsDefault.default).isFunction(parser)) return parser.call(this, value, key);
                if ((0, _utilsJsDefault.default).isRegExp(parser)) return parser.exec(value);
                throw new TypeError('parser must be boolean|regexp|function');
            }
        }
    }
    has(header, matcher) {
        header = normalizeHeader(header);
        if (header) {
            const key = (0, _utilsJsDefault.default).findKey(this, header);
            return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
        }
        return false;
    }
    delete(header, matcher) {
        const self = this;
        let deleted = false;
        function deleteHeader(_header) {
            _header = normalizeHeader(_header);
            if (_header) {
                const key = (0, _utilsJsDefault.default).findKey(self, _header);
                if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
                    delete self[key];
                    deleted = true;
                }
            }
        }
        if ((0, _utilsJsDefault.default).isArray(header)) header.forEach(deleteHeader);
        else deleteHeader(header);
        return deleted;
    }
    clear(matcher) {
        const keys = Object.keys(this);
        let i = keys.length;
        let deleted = false;
        while(i--){
            const key = keys[i];
            if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
                delete this[key];
                deleted = true;
            }
        }
        return deleted;
    }
    normalize(format) {
        const self = this;
        const headers = Object.create(null);
        (0, _utilsJsDefault.default).forEach(this, (value, header)=>{
            const key = (0, _utilsJsDefault.default).findKey(headers, header);
            if (key) {
                self[key] = normalizeValue(value);
                delete self[header];
                return;
            }
            const normalized = headerSlot(format ? formatHeader(header) : String(header).trim());
            if (normalized !== header) delete self[header];
            self[normalized] = normalizeValue(value);
            headers[normalized] = true;
        });
        return this;
    }
    concat(...targets) {
        return this.constructor.concat(this, ...targets);
    }
    toJSON(asStrings) {
        const obj = Object.create(null);
        (0, _utilsJsDefault.default).forEach(this, (value, header)=>{
            value != null && value !== false && (obj[header] = asStrings && (0, _utilsJsDefault.default).isArray(value) ? value.join(', ') : value);
        });
        return obj;
    }
    [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
        return Object.entries(this.toJSON()).map(([header, value])=>header + ': ' + value).join('\n');
    }
    getSetCookie() {
        const value = this.get('set-cookie');
        return (0, _utilsJsDefault.default).isArray(value) ? value : value == null || value === false ? [] : [
            value
        ];
    }
    get [Symbol.toStringTag]() {
        return 'AxiosHeaders';
    }
    static from(thing) {
        return thing instanceof this ? thing : new this(thing);
    }
    static parseParameters(value) {
        return parseParameters(value);
    }
    static concat(first, ...targets) {
        const computed = new this(first);
        targets.forEach((target)=>computed.set(target));
        return computed;
    }
    static accessor(header) {
        const internals = this[$internals] = this[$internals] = {
            accessors: {}
        };
        const accessors = internals.accessors;
        const prototype = this.prototype;
        function defineAccessor(_header) {
            const lHeader = normalizeHeader(_header);
            if (!accessors[lHeader]) {
                buildAccessors(prototype, _header);
                accessors[lHeader] = true;
            }
        }
        (0, _utilsJsDefault.default).isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
        return this;
    }
}
AxiosHeaders.accessor([
    'Content-Type',
    'Content-Length',
    'Accept',
    'Accept-Encoding',
    'User-Agent',
    'Authorization'
]);
// reserved names hotfix
(0, _utilsJsDefault.default).reduceDescriptors(AxiosHeaders.prototype, ({ value }, key)=>{
    let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
    return {
        get: ()=>value,
        set (headerValue) {
            this[mapped] = headerValue;
        }
    };
});
(0, _utilsJsDefault.default).freezeMethods(AxiosHeaders);
exports.default = AxiosHeaders;

},{"../utils.js":"3iykr","../helpers/parseHeaders.js":"cruHB","../helpers/sanitizeHeaderValue.js":"c1bLO","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"cruHB":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
'use strict';
// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = (0, _utilsJsDefault.default).toObjectSet([
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent'
]);
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */ exports.default = (rawHeaders)=>{
    // Header names are data, including __proto__; avoid inherited setters.
    const parsed = Object.create(null);
    let key;
    let val;
    let i;
    rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
        i = line.indexOf(':');
        key = line.substring(0, i).trim().toLowerCase();
        val = line.substring(i + 1).trim();
        const hasKey = (0, _utilsJsDefault.default).hasOwnProp(parsed, key);
        if (!key || hasKey && (0, _utilsJsDefault.default).hasOwnProp(ignoreDuplicateOf, key)) return;
        if (key === 'set-cookie') {
            if (hasKey) parsed[key].push(val);
            else parsed[key] = [
                val
            ];
        } else parsed[key] = hasKey ? parsed[key] + ', ' + val : val;
    });
    return parsed;
};

},{"../utils.js":"3iykr","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"c1bLO":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "sanitizeHeaderValue", ()=>sanitizeHeaderValue);
parcelHelpers.export(exports, "sanitizeByteStringHeaderValue", ()=>sanitizeByteStringHeaderValue);
parcelHelpers.export(exports, "toByteStringHeaderObject", ()=>toByteStringHeaderObject);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
'use strict';
function trimSPorHTAB(str) {
    let start = 0;
    let end = str.length;
    while(start < end){
        const code = str.charCodeAt(start);
        if (code !== 0x09 && code !== 0x20) break;
        start += 1;
    }
    while(end > start){
        const code = str.charCodeAt(end - 1);
        if (code !== 0x09 && code !== 0x20) break;
        end -= 1;
    }
    return start === 0 && end === str.length ? str : str.slice(start, end);
}
// The control-code ranges are intentional: header sanitization strips C0/DEL bytes.
// eslint-disable-next-line no-control-regex
const INVALID_UNICODE_HEADER_VALUE_CHARS = new RegExp('[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+', 'g');
// eslint-disable-next-line no-control-regex
const INVALID_BYTE_STRING_HEADER_VALUE_CHARS = new RegExp('[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+', 'g');
function sanitizeValue(value, invalidChars) {
    if ((0, _utilsJsDefault.default).isArray(value)) return value.map((item)=>sanitizeValue(item, invalidChars));
    return trimSPorHTAB(String(value).replace(invalidChars, ''));
}
const sanitizeHeaderValue = (value)=>sanitizeValue(value, INVALID_UNICODE_HEADER_VALUE_CHARS);
const sanitizeByteStringHeaderValue = (value)=>sanitizeValue(value, INVALID_BYTE_STRING_HEADER_VALUE_CHARS);
function toByteStringHeaderObject(headers) {
    const byteStringHeaders = Object.create(null);
    (0, _utilsJsDefault.default).forEach(headers.toJSON(), (value, header)=>{
        byteStringHeaders[header] = sanitizeByteStringHeaderValue(value);
    });
    return byteStringHeaders;
}

},{"../utils.js":"3iykr","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"dcPdz":[function(require,module,exports,__globalThis) {
// eslint-disable-next-line strict
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = null;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"5kgCt":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
'use strict';
const $internals = Symbol('internals');
// `handlers` is public and may be replaced with a nullish value by user code;
// `clear()` has always tolerated that. Treat it as an empty stack rather than
// dereferencing it.
function countHandlers(handlers) {
    return handlers ? handlers.length : 0;
}
function trimHandlers(handlers) {
    if (!handlers) return;
    while(handlers.length && handlers[handlers.length - 1] === null)handlers.pop();
}
// Preserve the array-key coercion used before IDs were stored in a Map, without
// treating null, empty strings, or noncanonical numeric strings as ID zero.
function normalizeHandlerId(id) {
    if (typeof id === 'string' && id !== '' && String(Number(id)) === id) return Number(id);
    return id;
}
function syncHandlerEntries(manager, internals) {
    const handlers = manager.handlers;
    const length = countHandlers(handlers);
    if (handlers !== internals.handlersRef) {
        internals.handlersRef = handlers;
        internals.handlerEntries.clear();
    } else if (length !== internals.handlersLength) {
        if (!length) internals.handlerEntries.clear();
        else internals.handlerEntries.forEach(function removeStaleEntry(entry, id) {
            if (handlers[entry.index] !== entry.handler) internals.handlerEntries.delete(id);
        });
    }
    internals.handlersLength = length;
}
class InterceptorManager {
    constructor(){
        this.handlers = [];
        this[$internals] = {
            handlersRef: this.handlers,
            handlersLength: this.handlers.length,
            handlerEntries: new Map(),
            iterationDepth: 0,
            nextId: 0
        };
    }
    /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   * @param {Object} options The options for the interceptor, synchronous and runWhen
   *
   * @return {Number} An ID used to remove interceptor later
   */ use(fulfilled, rejected, options) {
        const handler = {
            fulfilled,
            rejected,
            synchronous: options ? options.synchronous : false,
            runWhen: options ? options.runWhen : null
        };
        const internals = this[$internals];
        if (this.handlers == null) this.handlers = [];
        syncHandlerEntries(this, internals);
        const id = internals.nextId++;
        this.handlers.push(handler);
        internals.handlerEntries.set(id, {
            handler,
            index: this.handlers.length - 1
        });
        internals.handlersLength = this.handlers.length;
        return id;
    }
    /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */ eject(id) {
        const internals = this[$internals];
        syncHandlerEntries(this, internals);
        const handlerId = normalizeHandlerId(id);
        const entry = internals.handlerEntries.get(handlerId);
        if (entry) {
            internals.handlerEntries.delete(handlerId);
            // Ignore IDs invalidated by clear or direct replacement of handlers.
            if (this.handlers[entry.index] !== entry.handler) return;
            this.handlers[entry.index] = null;
            // Do not reuse an index while forEach is walking its length snapshot.
            if (!internals.iterationDepth) {
                trimHandlers(this.handlers);
                internals.handlersLength = this.handlers.length;
            }
        }
    }
    /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */ clear() {
        if (this.handlers) {
            this.handlers = [];
            syncHandlerEntries(this, this[$internals]);
        }
    }
    /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */ forEach(fn) {
        const internals = this[$internals];
        syncHandlerEntries(this, internals);
        internals.iterationDepth++;
        try {
            (0, _utilsJsDefault.default).forEach(this.handlers, function forEachHandler(h) {
                if (h !== null) fn(h);
            });
        } finally{
            if (!--internals.iterationDepth) {
                syncHandlerEntries(this, internals);
                trimHandlers(this.handlers);
                internals.handlersLength = countHandlers(this.handlers);
            }
        }
    }
}
exports.default = InterceptorManager;

},{"../utils.js":"3iykr","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"3o4wn":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>dispatchRequest);
var _transformDataJs = require("./transformData.js");
var _transformDataJsDefault = parcelHelpers.interopDefault(_transformDataJs);
var _isCancelJs = require("../cancel/isCancel.js");
var _isCancelJsDefault = parcelHelpers.interopDefault(_isCancelJs);
var _indexJs = require("../defaults/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _canceledErrorJs = require("../cancel/CanceledError.js");
var _canceledErrorJsDefault = parcelHelpers.interopDefault(_canceledErrorJs);
var _axiosHeadersJs = require("../core/AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
var _adaptersJs = require("../adapters/adapters.js");
var _adaptersJsDefault = parcelHelpers.interopDefault(_adaptersJs);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
'use strict';
/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */ function throwIfCancellationRequested(config) {
    if (config.cancelToken) config.cancelToken.throwIfRequested();
    if (config.signal && config.signal.aborted) throw new (0, _canceledErrorJsDefault.default)(null, config);
}
/**
 * Milliseconds elapsed since `start`, floored at zero.
 *
 * Wall-clock, to match the rest of the codebase (speedometer, throttle,
 * AxiosTransformStream). A backwards clock adjustment mid-request would
 * otherwise produce a negative duration, so the result is clamped.
 *
 * @param {number} start Timestamp from `Date.now()`
 *
 * @returns {number} Non-negative elapsed milliseconds
 */ function elapsedSince(start) {
    return Math.max(0, Date.now() - start);
}
function dispatchRequest(_config) {
    // Interceptors may replace the merged config with an ordinary object. Flatten
    // it at the dispatch boundary so shared prototype members cannot become
    // request behavior, while preserving intentional template/class members.
    const config = (0, _utilsJsDefault.default).toSafeFlatObject(_config);
    throwIfCancellationRequested(config);
    config.headers = (0, _axiosHeadersJsDefault.default).from((0, _utilsJsDefault.default).getSafeProp(config, 'headers'));
    // Transform request data
    config.data = (0, _transformDataJsDefault.default).call(config, config.transformRequest);
    if ([
        'post',
        'put',
        'patch'
    ].indexOf(config.method) !== -1) config.headers.setContentType('application/x-www-form-urlencoded', false);
    const adapter = (0, _adaptersJsDefault.default).getAdapter(config.adapter || (0, _indexJsDefault.default).adapter, config);
    const start = Date.now();
    return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.duration = elapsedSince(start);
        // Expose the current response on config so that transformResponse can
        // attach it to any AxiosError it throws (e.g. on JSON parse failure).
        // We clean it up afterwards to avoid polluting the config object.
        config.response = response;
        try {
            response.data = (0, _transformDataJsDefault.default).call(config, config.transformResponse, response);
        } finally{
            delete config.response;
        }
        response.headers = (0, _axiosHeadersJsDefault.default).from(response.headers);
        return response;
    }, function onAdapterRejection(reason) {
        if (!(0, _isCancelJsDefault.default)(reason)) {
            throwIfCancellationRequested(config);
            // Transform response data
            if (reason && reason.response) {
                reason.response.duration = elapsedSince(start);
                config.response = reason.response;
                try {
                    reason.response.data = (0, _transformDataJsDefault.default).call(config, config.transformResponse, reason.response);
                } finally{
                    delete config.response;
                }
                reason.response.headers = (0, _axiosHeadersJsDefault.default).from(reason.response.headers);
            }
        }
        return Promise.reject(reason);
    });
}

},{"./transformData.js":"eHIq4","../cancel/isCancel.js":"kXixS","../defaults/index.js":"13zrE","../cancel/CanceledError.js":"4Mizl","../core/AxiosHeaders.js":"47lYE","../adapters/adapters.js":"ezy6L","../utils.js":"3iykr","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"eHIq4":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>transformData);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _indexJs = require("../defaults/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _axiosHeadersJs = require("../core/AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
'use strict';
function transformData(fns, response) {
    const config = this || (0, _indexJsDefault.default);
    const context = response || config;
    const headers = (0, _axiosHeadersJsDefault.default).from(context.headers);
    let data = context.data;
    (0, _utilsJsDefault.default).forEach(fns, function transform(fn) {
        data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
    });
    headers.normalize();
    return data;
}

},{"../utils.js":"3iykr","../defaults/index.js":"13zrE","../core/AxiosHeaders.js":"47lYE","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"13zrE":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _transitionalJs = require("./transitional.js");
var _transitionalJsDefault = parcelHelpers.interopDefault(_transitionalJs);
var _toFormDataJs = require("../helpers/toFormData.js");
var _toFormDataJsDefault = parcelHelpers.interopDefault(_toFormDataJs);
var _toURLEncodedFormJs = require("../helpers/toURLEncodedForm.js");
var _toURLEncodedFormJsDefault = parcelHelpers.interopDefault(_toURLEncodedFormJs);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _formDataToJSONJs = require("../helpers/formDataToJSON.js");
var _formDataToJSONJsDefault = parcelHelpers.interopDefault(_formDataToJSONJs);
var _methodListJs = require("../core/methodList.js");
var _methodListJsDefault = parcelHelpers.interopDefault(_methodListJs);
'use strict';
const own = (obj, key)=>obj != null && (0, _utilsJsDefault.default).hasOwnProp(obj, key) ? obj[key] : undefined;
/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */ function stringifySafely(rawValue, parser, encoder) {
    if ((0, _utilsJsDefault.default).isString(rawValue)) try {
        (parser || JSON.parse)(rawValue);
        return (0, _utilsJsDefault.default).trim(rawValue);
    } catch (e) {
        if (e.name !== 'SyntaxError') throw e;
    }
    return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
    transitional: (0, _transitionalJsDefault.default),
    adapter: [
        'xhr',
        'http',
        'fetch'
    ],
    transformRequest: [
        function transformRequest(data, headers) {
            const contentType = headers.getContentType() || '';
            const hasJSONContentType = contentType.indexOf('application/json') > -1;
            const isObjectPayload = (0, _utilsJsDefault.default).isObject(data);
            if (isObjectPayload && (0, _utilsJsDefault.default).isHTMLForm(data)) data = new FormData(data);
            const isFormData = (0, _utilsJsDefault.default).isFormData(data);
            if (isFormData) return hasJSONContentType ? JSON.stringify((0, _formDataToJSONJsDefault.default)(data)) : data;
            if ((0, _utilsJsDefault.default).isArrayBuffer(data) || (0, _utilsJsDefault.default).isBuffer(data) || (0, _utilsJsDefault.default).isStream(data) || (0, _utilsJsDefault.default).isFile(data) || (0, _utilsJsDefault.default).isBlob(data) || (0, _utilsJsDefault.default).isReadableStream(data)) return data;
            if ((0, _utilsJsDefault.default).isArrayBufferView(data)) return data.buffer;
            if ((0, _utilsJsDefault.default).isURLSearchParams(data)) {
                headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
                return data.toString();
            }
            let isFileList;
            if (isObjectPayload) {
                const formSerializer = own(this, 'formSerializer');
                if (contentType.indexOf('application/x-www-form-urlencoded') > -1) return (0, _toURLEncodedFormJsDefault.default)(data, formSerializer).toString();
                if ((isFileList = (0, _utilsJsDefault.default).isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
                    const env = own(this, 'env');
                    const _FormData = env && env.FormData;
                    return (0, _toFormDataJsDefault.default)(isFileList ? {
                        'files[]': data
                    } : data, _FormData && new _FormData(), formSerializer);
                }
            }
            if (isObjectPayload || hasJSONContentType) {
                headers.setContentType('application/json', false);
                return stringifySafely(data);
            }
            return data;
        }
    ],
    transformResponse: [
        function transformResponse(data) {
            const transitional = own(this, 'transitional') || defaults.transitional;
            const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
            const responseType = own(this, 'responseType');
            const JSONRequested = responseType === 'json';
            if ((0, _utilsJsDefault.default).isResponse(data) || (0, _utilsJsDefault.default).isReadableStream(data)) return data;
            if (data && (0, _utilsJsDefault.default).isString(data) && (forcedJSONParsing && !responseType || JSONRequested)) {
                const silentJSONParsing = transitional && transitional.silentJSONParsing;
                const strictJSONParsing = !silentJSONParsing && JSONRequested;
                try {
                    return JSON.parse(data, own(this, 'parseReviver'));
                } catch (e) {
                    if (strictJSONParsing) {
                        if (e.name === 'SyntaxError') throw (0, _axiosErrorJsDefault.default).from(e, (0, _axiosErrorJsDefault.default).ERR_BAD_RESPONSE, this, null, own(this, 'response'));
                        throw e;
                    }
                }
            }
            return data;
        }
    ],
    /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */ timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
        FormData: (0, _indexJsDefault.default).classes.FormData,
        Blob: (0, _indexJsDefault.default).classes.Blob
    },
    validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
    },
    headers: {
        common: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': undefined
        }
    }
};
(0, _utilsJsDefault.default).forEach((0, _methodListJsDefault.default), (method)=>{
    defaults.headers[method] = {};
});
exports.default = defaults;

},{"../utils.js":"3iykr","../core/AxiosError.js":"1ZnKZ","./transitional.js":"8cBkP","../helpers/toFormData.js":"gd6fR","../helpers/toURLEncodedForm.js":"2qtr7","../platform/index.js":"9GYUB","../helpers/formDataToJSON.js":"4rQRz","../core/methodList.js":"lsByC","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"8cBkP":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
'use strict';
exports.default = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false,
    legacyInterceptorReqResOrdering: true,
    advertiseZstdAcceptEncoding: false,
    validateStatusUndefinedResolves: true,
    encodeBasicAuthUsername: false
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"2qtr7":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>toURLEncodedForm);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _toFormDataJs = require("./toFormData.js");
var _toFormDataJsDefault = parcelHelpers.interopDefault(_toFormDataJs);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
'use strict';
function toURLEncodedForm(data, options) {
    return (0, _toFormDataJsDefault.default)(data, new (0, _indexJsDefault.default).classes.URLSearchParams(), {
        visitor: function(value, key, path, helpers) {
            if ((0, _indexJsDefault.default).isNode && (0, _utilsJsDefault.default).isBuffer(value)) {
                this.append(key, value.toString('base64'));
                return false;
            }
            return helpers.defaultVisitor.apply(this, arguments);
        },
        ...options
    });
}

},{"../utils.js":"3iykr","./toFormData.js":"gd6fR","../platform/index.js":"9GYUB","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"9GYUB":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("./node/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _utilsJs = require("./common/utils.js");
exports.default = {
    ..._utilsJs,
    ...(0, _indexJsDefault.default)
};

},{"./node/index.js":"03wkV","./common/utils.js":"kAvoR","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"03wkV":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _urlsearchParamsJs = require("./classes/URLSearchParams.js");
var _urlsearchParamsJsDefault = parcelHelpers.interopDefault(_urlsearchParamsJs);
var _formDataJs = require("./classes/FormData.js");
var _formDataJsDefault = parcelHelpers.interopDefault(_formDataJs);
var _blobJs = require("./classes/Blob.js");
var _blobJsDefault = parcelHelpers.interopDefault(_blobJs);
exports.default = {
    isBrowser: true,
    classes: {
        URLSearchParams: (0, _urlsearchParamsJsDefault.default),
        FormData: (0, _formDataJsDefault.default),
        Blob: (0, _blobJsDefault.default)
    },
    protocols: [
        'http',
        'https',
        'file',
        'blob',
        'url',
        'data'
    ]
};

},{"./classes/URLSearchParams.js":"DsWyn","./classes/FormData.js":"9uJwM","./classes/Blob.js":"dvAKr","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"DsWyn":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _axiosURLSearchParamsJs = require("../../../helpers/AxiosURLSearchParams.js");
var _axiosURLSearchParamsJsDefault = parcelHelpers.interopDefault(_axiosURLSearchParamsJs);
'use strict';
exports.default = typeof URLSearchParams !== 'undefined' ? URLSearchParams : (0, _axiosURLSearchParamsJsDefault.default);

},{"../../../helpers/AxiosURLSearchParams.js":"k8E7Y","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"9uJwM":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
'use strict';
exports.default = typeof FormData !== 'undefined' ? FormData : null;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"dvAKr":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
'use strict';
exports.default = typeof Blob !== 'undefined' ? Blob : null;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"kAvoR":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "hasBrowserEnv", ()=>hasBrowserEnv);
parcelHelpers.export(exports, "hasStandardBrowserWebWorkerEnv", ()=>hasStandardBrowserWebWorkerEnv);
parcelHelpers.export(exports, "hasStandardBrowserEnv", ()=>hasStandardBrowserEnv);
parcelHelpers.export(exports, "navigator", ()=>_navigator);
parcelHelpers.export(exports, "origin", ()=>origin);
const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';
const _navigator = typeof navigator === 'object' && navigator || undefined;
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */ const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || [
    'ReactNative',
    'NativeScript',
    'NS'
].indexOf(_navigator.product) < 0);
/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */ const hasStandardBrowserWebWorkerEnv = (()=>{
    return typeof WorkerGlobalScope !== 'undefined' && // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope && typeof self.importScripts === 'function';
})();
const origin = hasBrowserEnv && window.location.href || 'http://localhost';

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"4rQRz":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _toFormDataJs = require("./toFormData.js");
'use strict';
const MAX_DEPTH = (0, _toFormDataJs.DEFAULT_FORM_DATA_MAX_DEPTH);
function throwIfDepthExceeded(index) {
    if (index > MAX_DEPTH) throw new (0, _axiosErrorJsDefault.default)('FormData field is too deeply nested (' + index + ' levels). Max depth: ' + MAX_DEPTH, (0, _axiosErrorJsDefault.default).ERR_FORM_DATA_DEPTH_EXCEEDED);
}
/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */ function parsePropPath(name) {
    // foo[x][y][z] -> ['foo', 'x', 'y', 'z']
    // foo.x.y.z    -> ['foo', 'x', 'y', 'z']
    // A path is split on `.` and on `[...]` groups. A segment — whether written
    // in dot notation or captured inside brackets — may contain any character
    // except `.`, `[` and `]`, so a key like `user-name` or `user name` is kept
    // literal instead of being split (#5402). `.`, `[` and `]` keep their existing
    // meaning, e.g. `foo[bar.baz]` -> ['foo', 'bar', 'baz'] and `[]` is an array push.
    // Excluding `[` from the bracket group also makes the match fail fast at the
    // next `[`, so a malformed name cannot rescan to the end of the string from
    // every unmatched `[` — parsing stays linear in the length of the name.
    const path = [];
    const pattern = /[^.[\]]+|\[([^.[\]]*)]/g;
    let match;
    while((match = pattern.exec(name)) !== null){
        throwIfDepthExceeded(path.length);
        path.push(match[0] === '[]' ? '' : match[1] || match[0]);
    }
    return path;
}
/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */ function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i;
    const len = keys.length;
    let key;
    for(i = 0; i < len; i++){
        key = keys[i];
        obj[key] = arr[key];
    }
    return obj;
}
function normalizeArray(value) {
    if (!(0, _utilsJsDefault.default).isArray(value)) return value;
    const keys = Object.keys(value);
    return keys.length !== value.length || keys.some((key, index)=>key !== String(index)) ? arrayToObject(value) : value;
}
function normalizeArrays(obj) {
    const pending = [
        obj
    ];
    while(pending.length){
        const target = pending.pop();
        Object.keys(target).forEach((key)=>{
            const value = target[key] = normalizeArray(target[key]);
            if ((0, _utilsJsDefault.default).isArray(value) || (0, _utilsJsDefault.default).isPlainObject(value)) pending.push(value);
        });
    }
    return obj;
}
/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */ function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
        throwIfDepthExceeded(index);
        let name = path[index++];
        if (name === '__proto__') return true;
        const isNumericKey = Number.isFinite(+name);
        const isLast = index >= path.length;
        name = !name && (0, _utilsJsDefault.default).isArray(target) ? target.length : name;
        if (isLast) {
            if ((0, _utilsJsDefault.default).hasOwnProp(target, name)) {
                target[name] = normalizeArray(target[name]);
                target[name] = (0, _utilsJsDefault.default).isArray(target[name]) ? target[name].concat(value) : [
                    target[name],
                    value
                ];
            } else target[name] = value;
            return !isNumericKey;
        }
        if (!(0, _utilsJsDefault.default).hasOwnProp(target, name) || !(0, _utilsJsDefault.default).isObject(target[name])) target[name] = [];
        const result = buildPath(path, value, target[name], index);
        if (result && (0, _utilsJsDefault.default).isArray(target[name])) target[name] = arrayToObject(target[name]);
        return !isNumericKey;
    }
    if ((0, _utilsJsDefault.default).isFormData(formData) && (0, _utilsJsDefault.default).isFunction(formData.entries)) {
        const obj = {};
        (0, _utilsJsDefault.default).forEachEntry(formData, (name, value)=>{
            buildPath(parsePropPath(name), value, obj, 0);
        });
        return normalizeArrays(obj);
    }
    return null;
}
exports.default = formDataToJSON;

},{"../utils.js":"3iykr","../core/AxiosError.js":"1ZnKZ","./toFormData.js":"gd6fR","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"lsByC":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
'use strict';
const methodList = Object.freeze([
    'get',
    'delete',
    'head',
    'options',
    'post',
    'put',
    'patch',
    'purge',
    'link',
    'unlink',
    'query'
]);
exports.default = methodList;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"kXixS":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>isCancel);
'use strict';
function isCancel(value) {
    return !!(value && value.__CANCEL__);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"4Mizl":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
'use strict';
class CanceledError extends (0, _axiosErrorJsDefault.default) {
    /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */ constructor(message, config, request){
        super(message == null ? 'canceled' : message, (0, _axiosErrorJsDefault.default).ERR_CANCELED, config, request);
        this.name = 'CanceledError';
        this.__CANCEL__ = true;
    }
}
exports.default = CanceledError;

},{"../core/AxiosError.js":"1ZnKZ","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"ezy6L":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _httpJs = require("./http.js");
var _httpJsDefault = parcelHelpers.interopDefault(_httpJs);
var _xhrJs = require("./xhr.js");
var _xhrJsDefault = parcelHelpers.interopDefault(_xhrJs);
var _fetchJs = require("./fetch.js");
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
/**
 * Known adapters mapping.
 * Provides environment-specific adapters for Axios:
 * - `http` for Node.js
 * - `xhr` for browsers
 * - `fetch` for fetch API-based requests
 *
 * @type {Object<string, Function|Object>}
 */ const knownAdapters = {
    http: (0, _httpJsDefault.default),
    xhr: (0, _xhrJsDefault.default),
    fetch: {
        get: _fetchJs.getFetch
    }
};
// Assign adapter names for easier debugging and identification
(0, _utilsJsDefault.default).forEach(knownAdapters, (fn, value)=>{
    if (fn) {
        try {
            // Null-proto descriptors so a polluted Object.prototype.get cannot turn
            // these data descriptors into accessor descriptors on the way in.
            Object.defineProperty(fn, 'name', {
                __proto__: null,
                value
            });
        } catch (e) {
        // eslint-disable-next-line no-empty
        }
        Object.defineProperty(fn, 'adapterName', {
            __proto__: null,
            value
        });
    }
});
/**
 * Render a rejection reason string for unknown or unsupported adapters
 *
 * @param {string} reason
 * @returns {string}
 */ const renderReason = (reason)=>`- ${reason}`;
/**
 * Check if the adapter is resolved (function, null, or false)
 *
 * @param {Function|null|false} adapter
 * @returns {boolean}
 */ const isResolvedHandle = (adapter)=>(0, _utilsJsDefault.default).isFunction(adapter) || adapter === null || adapter === false;
/**
 * Get the first suitable adapter from the provided list.
 * Tries each adapter in order until a supported one is found.
 * Throws an AxiosError if no adapter is suitable.
 *
 * @param {Array<string|Function>|string|Function} adapters - Adapter(s) by name or function.
 * @param {Object} config - Axios request configuration
 * @throws {AxiosError} If no suitable adapter is available
 * @returns {Function} The resolved adapter function
 */ function getAdapter(adapters, config) {
    adapters = (0, _utilsJsDefault.default).isArray(adapters) ? adapters : [
        adapters
    ];
    const { length } = adapters;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for(let i = 0; i < length; i++){
        nameOrAdapter = adapters[i];
        let id;
        adapter = nameOrAdapter;
        if (!isResolvedHandle(nameOrAdapter)) {
            adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
            if (adapter === undefined) throw new (0, _axiosErrorJsDefault.default)(`Unknown adapter '${id}'`);
        }
        if (adapter && ((0, _utilsJsDefault.default).isFunction(adapter) || (adapter = adapter.get(config)))) break;
        rejectedReasons[id || '#' + i] = adapter;
    }
    if (!adapter) {
        const reasons = Object.entries(rejectedReasons).map(([id, state])=>`adapter ${id} ` + (state === false ? 'is not supported by the environment' : 'is not available in the build'));
        let s = length ? reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0]) : 'as no adapter specified';
        throw new (0, _axiosErrorJsDefault.default)(`There is no suitable adapter to dispatch the request ` + s, (0, _axiosErrorJsDefault.default).ERR_NOT_SUPPORT);
    }
    return adapter;
}
/**
 * Exports Axios adapters and utility to resolve an adapter
 */ exports.default = {
    /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */ getAdapter,
    /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */ adapters: knownAdapters
};

},{"../utils.js":"3iykr","./http.js":"dcPdz","./xhr.js":"gSbgN","./fetch.js":"iIplg","../core/AxiosError.js":"1ZnKZ","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"gSbgN":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _settleJs = require("../core/settle.js");
var _settleJsDefault = parcelHelpers.interopDefault(_settleJs);
var _transitionalJs = require("../defaults/transitional.js");
var _transitionalJsDefault = parcelHelpers.interopDefault(_transitionalJs);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _canceledErrorJs = require("../cancel/CanceledError.js");
var _canceledErrorJsDefault = parcelHelpers.interopDefault(_canceledErrorJs);
var _normalizeURLForProtocolCheckJs = require("../helpers/normalizeURLForProtocolCheck.js");
var _normalizeURLForProtocolCheckJsDefault = parcelHelpers.interopDefault(_normalizeURLForProtocolCheckJs);
var _parseProtocolJs = require("../helpers/parseProtocol.js");
var _parseProtocolJsDefault = parcelHelpers.interopDefault(_parseProtocolJs);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _axiosHeadersJs = require("../core/AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
var _cookiesJs = require("../helpers/cookies.js");
var _cookiesJsDefault = parcelHelpers.interopDefault(_cookiesJs);
var _progressEventReducerJs = require("../helpers/progressEventReducer.js");
var _resolveConfigJs = require("../helpers/resolveConfig.js");
var _resolveConfigJsDefault = parcelHelpers.interopDefault(_resolveConfigJs);
var _sanitizeHeaderValueJs = require("../helpers/sanitizeHeaderValue.js");
const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';
exports.default = isXHRAdapterSupported && function(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
        let useAsyncXsrf;
        try {
            const store = (0, _indexJsDefault.default).hasStandardBrowserEnv && typeof window !== 'undefined' && window.cookieStore;
            useAsyncXsrf = store && (0, _utilsJsDefault.default).isFunction(store.get);
        } catch (e) {
        // A restricted Cookie Store getter must retain the synchronous fallback.
        }
        let xsrfCookieName;
        const _config = (0, _resolveConfigJsDefault.default)(config, useAsyncXsrf ? (name)=>{
            xsrfCookieName = name;
            return null;
        } : undefined);
        let requestData = _config.data;
        const requestHeaders = (0, _axiosHeadersJsDefault.default).from(_config.headers).normalize();
        let { responseType, onUploadProgress, onDownloadProgress } = _config;
        let onCanceled;
        let timeoutId;
        let uploadThrottled, downloadThrottled;
        let flushUpload, flushDownload, flushDownloadWithEvent;
        function done() {
            clearTimeout(timeoutId);
            // A final progress callback must not prevent the remaining cleanup.
            // Report errors asynchronously, as onloadend and the throttle timer do.
            try {
                flushUpload && flushUpload(); // flush events
            } catch (err) {
                setTimeout(()=>{
                    throw err;
                });
            }
            try {
                flushDownload && flushDownload(); // flush events
            } catch (err) {
                setTimeout(()=>{
                    throw err;
                });
            }
            // A flush can synchronously cancel the request and reenter done().
            // In that case the inner call has already detached these listeners.
            if (request) {
                downloadThrottled && request.removeEventListener('progress', downloadThrottled);
                if (request.upload) {
                    uploadThrottled && request.upload.removeEventListener('progress', uploadThrottled);
                    flushUpload && request.upload.removeEventListener('loadend', flushUpload);
                }
            }
            _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
            _config.signal && _config.signal.removeEventListener('abort', onCanceled);
        }
        let request = new XMLHttpRequest();
        request.open(_config.method.toUpperCase(), _config.url, true);
        // Set the request timeout in MS
        request.timeout = _config.timeout;
        function onloadend(event) {
            if (!request) return;
            // Status 0 means no response was received, which onerror and onabort normally
            // reject before this runs. Firefox 152 fires only readystatechange and loadend for
            // navigation-canceled requests (https://bugzilla.mozilla.org/show_bug.cgi?id=1505389),
            // leaving settle() to resolve them as an empty success. ECONNABORTED is the error
            // onabort raised on Firefox 151. Reads over file:, which some environments report as
            // status 0 on success, are excluded by the request URL's scheme after browser-style
            // preprocessing, by the page origin's scheme for relative URLs (which inherit it), or
            // by responseURL where implemented.
            if (request.status === 0 && ((0, _parseProtocolJsDefault.default)((0, _normalizeURLForProtocolCheckJsDefault.default)(_config.url)) || (0, _parseProtocolJsDefault.default)((0, _indexJsDefault.default).origin)) !== 'file' && !(request.responseURL && request.responseURL.startsWith('file:'))) {
                reject(new (0, _axiosErrorJsDefault.default)('Request aborted', (0, _axiosErrorJsDefault.default).ECONNABORTED, config, request));
                done();
                // Clean up request
                request = null;
                return;
            }
            // When loadend is still dispatching, flushing with it gives progress
            // listeners a final delivery whose event has a live target. The legacy
            // ready-state fallback has no event, so replay its pending progress.
            // A throwing listener must not block settlement; rethrow asynchronously,
            // matching how listener errors surface on the throttle timer path.
            try {
                if (event) flushDownloadWithEvent && flushDownloadWithEvent(event);
                else flushDownload && flushDownload();
            } catch (err) {
                setTimeout(()=>{
                    throw err;
                });
            }
            // A final progress callback can cancel the request synchronously.
            if (!request) return;
            // Prepare the response
            const responseHeaders = (0, _axiosHeadersJsDefault.default).from('getAllResponseHeaders' in request && request.getAllResponseHeaders());
            const responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
            const response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            };
            (0, _settleJsDefault.default)(function _resolve(value) {
                resolve(value);
                done();
            }, function _reject(err) {
                reject(err);
                done();
            }, response);
            // Clean up request
            request = null;
        }
        if ('onloadend' in request) // Use onloadend if available
        request.onloadend = onloadend;
        else // Listen for ready state to emulate onloadend
        request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) return;
            // The request errored out and we didn't get a response, this will be
            // handled by onerror instead
            // With one exception: request that using file: protocol, most browsers
            // will return status as 0 even though it's a successful request
            if (request.status === 0 && !(request.responseURL && request.responseURL.startsWith('file:'))) return;
            // readystate handler is calling before onerror or ontimeout handlers,
            // so we should call onloadend on the next 'tick'
            setTimeout(onloadend);
        };
        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
            if (!request) return;
            reject(new (0, _axiosErrorJsDefault.default)('Request aborted', (0, _axiosErrorJsDefault.default).ECONNABORTED, config, request));
            done();
            // Clean up request
            request = null;
        };
        // Handle low level network errors
        request.onerror = function handleError(event) {
            // Browsers deliver a ProgressEvent in XHR onerror
            // (message may be empty; when present, surface it)
            // See https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/error_event
            const msg = event && event.message ? event.message : 'Network Error';
            const err = new (0, _axiosErrorJsDefault.default)(msg, (0, _axiosErrorJsDefault.default).ERR_NETWORK, config, request);
            // attach the underlying event for consumers who want details
            err.event = event || null;
            reject(err);
            done();
            request = null;
        };
        // Handle timeout
        request.ontimeout = function handleTimeout() {
            if (!request) return;
            let timeoutErrorMessage = _config.timeout ? 'timeout of ' + _config.timeout + 'ms exceeded' : 'timeout exceeded';
            const transitional = _config.transitional || (0, _transitionalJsDefault.default);
            if (_config.timeoutErrorMessage) timeoutErrorMessage = _config.timeoutErrorMessage;
            reject(new (0, _axiosErrorJsDefault.default)(timeoutErrorMessage, transitional.clarifyTimeoutError ? (0, _axiosErrorJsDefault.default).ETIMEDOUT : (0, _axiosErrorJsDefault.default).ECONNABORTED, config, request));
            done();
            // Clean up request
            request = null;
        };
        // Remove Content-Type if data is undefined
        requestData === undefined && requestHeaders.setContentType(null);
        // Add withCredentials to request if needed
        if (!(0, _utilsJsDefault.default).isUndefined(_config.withCredentials)) request.withCredentials = !!_config.withCredentials;
        // Add responseType to request if needed
        if (responseType && responseType !== 'json') request.responseType = _config.responseType;
        // Handle progress if needed
        if (onDownloadProgress) {
            [downloadThrottled, flushDownload, flushDownloadWithEvent] = (0, _progressEventReducerJs.progressEventReducer)(onDownloadProgress, true);
            request.addEventListener('progress', downloadThrottled);
        }
        // Not all browsers support upload events
        if (onUploadProgress && request.upload) {
            [uploadThrottled, flushUpload] = (0, _progressEventReducerJs.progressEventReducer)(onUploadProgress);
            request.upload.addEventListener('progress', uploadThrottled);
            request.upload.addEventListener('loadend', flushUpload);
        }
        if (_config.cancelToken || _config.signal) {
            // Handle cancellation
            // eslint-disable-next-line func-names
            onCanceled = (cancel)=>{
                if (!request) return;
                reject(!cancel || cancel.type ? new (0, _canceledErrorJsDefault.default)(null, config, request) : cancel);
                const xhr = request;
                done();
                request = null;
                xhr.abort();
            };
            _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
            if (!request) return;
            if (_config.signal) _config.signal.aborted ? onCanceled() : _config.signal.addEventListener('abort', onCanceled);
        }
        if (!request) return;
        const protocol = (0, _parseProtocolJsDefault.default)(_config.url);
        if (protocol && !(0, _indexJsDefault.default).protocols.includes(protocol)) {
            reject(new (0, _axiosErrorJsDefault.default)('Unsupported protocol ' + protocol + ':', (0, _axiosErrorJsDefault.default).ERR_BAD_REQUEST, config));
            done();
            return;
        }
        const sendRequest = ()=>{
            if (!request) return;
            // Apply headers after an asynchronous XSRF read so existing headers are
            // replaced through AxiosHeaders rather than appended by the native XHR.
            if ('setRequestHeader' in request) (0, _utilsJsDefault.default).forEach((0, _sanitizeHeaderValueJs.toByteStringHeaderObject)(requestHeaders), function setRequestHeader(val, key) {
                request.setRequestHeader(key, val);
            });
            request.send(requestData || null);
        };
        if (xsrfCookieName) {
            // Native XHR timeout starts at send(). Cover cookie preparation and the
            // subsequent request with the same budget and existing timeout handler.
            const now = typeof performance !== 'undefined' && (0, _utilsJsDefault.default).isFunction(performance.now) ? ()=>performance.now() : Date.now;
            const deadline = request.timeout > 0 ? now() + Number(request.timeout) : undefined;
            const abortOnTimeout = ()=>{
                if (!request) return;
                const xhr = request;
                xhr.ontimeout();
                xhr.abort();
            };
            if (deadline !== undefined) {
                const scheduleTimeout = ()=>{
                    const remaining = deadline - now();
                    if (remaining > 0) // Browser timers overflow above the signed 32-bit delay limit.
                    timeoutId = setTimeout(scheduleTimeout, Math.min(remaining, 0x7fffffff));
                    else abortOnTimeout();
                };
                scheduleTimeout();
            }
            (0, _cookiesJsDefault.default).readAsync(xsrfCookieName).then((value)=>{
                if (!request) return;
                // Promise callbacks may run before an overdue timer after a busy task.
                if (deadline !== undefined && now() >= deadline) {
                    abortOnTimeout();
                    return;
                }
                if (value) {
                    const headerName = (0, _utilsJsDefault.default).hasOwnProp(_config, 'xsrfHeaderName') && _config.xsrfHeaderName;
                    requestHeaders.set(headerName, value);
                }
                sendRequest();
            }).catch((error)=>{
                if (!request) return;
                reject((0, _axiosErrorJsDefault.default).from(error, null, config, request));
                done();
                request = null;
            });
        } else sendRequest();
    });
};

},{"../utils.js":"3iykr","../core/settle.js":"1R8jV","../defaults/transitional.js":"8cBkP","../core/AxiosError.js":"1ZnKZ","../cancel/CanceledError.js":"4Mizl","../helpers/normalizeURLForProtocolCheck.js":"37bDM","../helpers/parseProtocol.js":"5pE6K","../platform/index.js":"9GYUB","../core/AxiosHeaders.js":"47lYE","../helpers/cookies.js":"7TOhl","../helpers/progressEventReducer.js":"lY2DP","../helpers/resolveConfig.js":"37JYD","../helpers/sanitizeHeaderValue.js":"c1bLO","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"1R8jV":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>settle);
var _axiosErrorJs = require("./AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
'use strict';
function settle(resolve, reject, response) {
    const validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) resolve(response);
    else reject(new (0, _axiosErrorJsDefault.default)('Request failed with status code ' + response.status, response.status >= 400 && response.status < 500 ? (0, _axiosErrorJsDefault.default).ERR_BAD_REQUEST : (0, _axiosErrorJsDefault.default).ERR_BAD_RESPONSE, response.config, response.request, response));
}

},{"./AxiosError.js":"1ZnKZ","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"37bDM":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>normalizeURLForProtocolCheck);
'use strict';
const urlParserControlCharacters = /[\t\n\r]/g;
function normalizeURLForProtocolCheck(url) {
    if (typeof url !== 'string') return url;
    let start = 0;
    while(start < url.length && url.charCodeAt(start) <= 0x20)start++;
    return url.slice(start).replace(urlParserControlCharacters, '');
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"5pE6K":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>parseProtocol);
'use strict';
function parseProtocol(url) {
    const match = /^([-+\w]{1,25}):(?:\/\/)?/.exec(url);
    return match && match[1].toLowerCase() || '';
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"7TOhl":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
const decodeCookieValue = (value)=>{
    try {
        return decodeURIComponent(value);
    } catch (e) {
        return value;
    }
};
exports.default = (0, _indexJsDefault.default).hasStandardBrowserEnv ? {
    write (name, value, expires, path, domain, secure, sameSite) {
        if (typeof document === 'undefined') return;
        const cookie = [
            `${name}=${encodeURIComponent(value)}`
        ];
        if ((0, _utilsJsDefault.default).isNumber(expires)) cookie.push(`expires=${new Date(expires).toUTCString()}`);
        if ((0, _utilsJsDefault.default).isString(path)) cookie.push(`path=${path}`);
        if ((0, _utilsJsDefault.default).isString(domain)) cookie.push(`domain=${domain}`);
        if (secure === true) cookie.push('secure');
        if ((0, _utilsJsDefault.default).isString(sameSite)) cookie.push(`SameSite=${sameSite}`);
        document.cookie = cookie.join('; ');
    },
    read (name) {
        if (typeof document === 'undefined') return null;
        const cookieString = document.cookie;
        if (!cookieString) return null;
        // Match name=value by splitting on the semicolon separator instead of building a
        // RegExp from `name` — interpolating an unescaped string into a RegExp would let
        // metacharacters (e.g. `.+?` in an attacker-influenced cookie name) cause ReDoS or
        // match the wrong cookie. Browsers may serialize cookie pairs as either ";" or
        // "; ", so ignore optional whitespace before each cookie name.
        const cookies = cookieString.split(';');
        for(let i = 0; i < cookies.length; i++){
            const cookie = cookies[i].replace(/^\s+/, '');
            const eq = cookie.indexOf('=');
            if (eq !== -1 && cookie.slice(0, eq) === name) return decodeCookieValue(cookie.slice(eq + 1));
        }
        return null;
    },
    async readAsync (name) {
        try {
            const store = typeof window !== 'undefined' && window.cookieStore;
            if (store && (0, _utilsJsDefault.default).isFunction(store.get)) {
                const cookie = await store.get(name);
                // Both APIs expose stored bytes; preserve Axios's existing URI decoding.
                return cookie ? decodeCookieValue(cookie.value) : null;
            }
        } catch (e) {
        // Restricted or unavailable storage retains the synchronous fallback.
        }
        return this.read(name);
    },
    remove (name) {
        this.write(name, '', Date.now() - 86400000, '/');
    }
} : {
    write () {},
    read () {
        return null;
    },
    async readAsync () {
        return null;
    },
    remove () {}
};

},{"../utils.js":"3iykr","../platform/index.js":"9GYUB","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"lY2DP":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "progressEventReducer", ()=>progressEventReducer);
parcelHelpers.export(exports, "progressEventDecorator", ()=>progressEventDecorator);
parcelHelpers.export(exports, "asyncDecorator", ()=>asyncDecorator);
var _speedometerJs = require("./speedometer.js");
var _speedometerJsDefault = parcelHelpers.interopDefault(_speedometerJs);
var _throttleJs = require("./throttle.js");
var _throttleJsDefault = parcelHelpers.interopDefault(_throttleJs);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
const progressEventReducer = (listener, isDownloadStream, freq = 3)=>{
    let bytesNotified = 0;
    const _speedometer = (0, _speedometerJsDefault.default)(50, 250);
    return (0, _throttleJsDefault.default)((e)=>{
        if (!e || !(0, _utilsJsDefault.default).isNumber(e.loaded)) return;
        const rawLoaded = e.loaded;
        const total = e.lengthComputable ? e.total : undefined;
        const loaded = Math.max(0, total != null ? Math.min(rawLoaded, total) : rawLoaded);
        const progressBytes = Math.max(0, loaded - bytesNotified);
        const rate = _speedometer(progressBytes);
        bytesNotified = Math.max(bytesNotified, loaded);
        const data = {
            loaded,
            total,
            progress: total ? loaded / total : undefined,
            bytes: progressBytes,
            rate: rate ? rate : undefined,
            estimated: rate && total ? (total - loaded) / rate : undefined,
            event: e,
            lengthComputable: total != null,
            [isDownloadStream ? 'download' : 'upload']: true
        };
        listener(data);
    }, freq);
};
const progressEventDecorator = (total, throttled)=>{
    const lengthComputable = total != null;
    return [
        (loaded)=>throttled[0]({
                lengthComputable,
                total,
                loaded
            }),
        throttled[1]
    ];
};
const asyncDecorator = (fn, scheduler = (0, _utilsJsDefault.default).asap)=>(...args)=>scheduler(()=>fn(...args));

},{"./speedometer.js":"55uq7","./throttle.js":"1119p","../utils.js":"3iykr","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"55uq7":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
'use strict';
/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */ function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;
    min = min !== undefined ? min : 1000;
    return function push(chunkLength) {
        const now = Date.now();
        const startedAt = timestamps[tail];
        if (!firstSampleTS) firstSampleTS = now;
        bytes[head] = chunkLength;
        timestamps[head] = now;
        let i = tail;
        let bytesCount = 0;
        while(i !== head){
            bytesCount += bytes[i++];
            i = i % samplesCount;
        }
        head = (head + 1) % samplesCount;
        if (head === tail) tail = (tail + 1) % samplesCount;
        if (now - firstSampleTS < min) return;
        const passed = startedAt && now - startedAt;
        return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
    };
}
exports.default = speedometer;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"1119p":[function(require,module,exports,__globalThis) {
/**
 * Throttle decorator
 * @param {Function} fn
 * @param {Number} freq
 * @return {Array<Function>}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function throttle(fn, freq) {
    let timestamp = 0;
    let threshold = 1000 / freq;
    let lastArgs;
    let timer;
    const invoke = (args, now = Date.now())=>{
        timestamp = now;
        lastArgs = null;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        fn(...args);
    };
    const throttled = (...args)=>{
        const now = Date.now();
        const passed = now - timestamp;
        if (passed >= threshold) invoke(args, now);
        else {
            lastArgs = args;
            if (!timer) timer = setTimeout(()=>{
                timer = null;
                invoke(lastArgs);
            }, threshold - passed);
        }
    };
    const flush = ()=>lastArgs && invoke(lastArgs);
    const flushWith = (...args)=>invoke(args);
    return [
        throttled,
        flush,
        flushWith
    ];
}
exports.default = throttle;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"37JYD":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _isURLSameOriginJs = require("./isURLSameOrigin.js");
var _isURLSameOriginJsDefault = parcelHelpers.interopDefault(_isURLSameOriginJs);
var _cookiesJs = require("./cookies.js");
var _cookiesJsDefault = parcelHelpers.interopDefault(_cookiesJs);
var _buildFullPathJs = require("../core/buildFullPath.js");
var _buildFullPathJsDefault = parcelHelpers.interopDefault(_buildFullPathJs);
var _mergeConfigJs = require("../core/mergeConfig.js");
var _mergeConfigJsDefault = parcelHelpers.interopDefault(_mergeConfigJs);
var _axiosHeadersJs = require("../core/AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
var _setFormDataHeadersJs = require("../core/setFormDataHeaders.js");
var _setFormDataHeadersJsDefault = parcelHelpers.interopDefault(_setFormDataHeadersJs);
var _buildURLJs = require("./buildURL.js");
var _buildURLJsDefault = parcelHelpers.interopDefault(_buildURLJs);
/**
 * Encode a UTF-8 string to a Latin-1 byte string for use with btoa().
 * This is a modern replacement for the deprecated unescape(encodeURIComponent(str)) pattern.
 *
 * @param {string} str The string to encode
 *
 * @returns {string} UTF-8 bytes as a Latin-1 string
 */ const encodeUTF8 = (str)=>encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex)=>String.fromCharCode(parseInt(hex, 16)));
const readCookie = (name)=>(0, _cookiesJsDefault.default).read(name);
function resolveConfig(config, readXsrfCookie = readCookie) {
    const newConfig = (0, _mergeConfigJsDefault.default)({}, config);
    // Read only own properties to prevent prototype pollution gadgets
    // (e.g. Object.prototype.baseURL = 'https://evil.com').
    const own = (key)=>(0, _utilsJsDefault.default).hasOwnProp(newConfig, key) ? newConfig[key] : undefined;
    const data = own('data');
    let withXSRFToken = own('withXSRFToken');
    const xsrfHeaderName = own('xsrfHeaderName');
    const xsrfCookieName = own('xsrfCookieName');
    let headers = own('headers');
    const auth = own('auth');
    const baseURL = own('baseURL');
    const allowAbsoluteUrls = own('allowAbsoluteUrls');
    const url = own('url');
    newConfig.headers = headers = (0, _axiosHeadersJsDefault.default).from(headers);
    newConfig.url = (0, _buildURLJsDefault.default)((0, _buildFullPathJsDefault.default)(baseURL, url, allowAbsoluteUrls, newConfig), own('params'), own('paramsSerializer'));
    // HTTP basic authentication
    if (auth) {
        const username = (0, _utilsJsDefault.default).getSafeProp(auth, 'username') || '';
        const password = (0, _utilsJsDefault.default).getSafeProp(auth, 'password') || '';
        const transitional = own('transitional');
        const encodeUsername = transitional && (0, _utilsJsDefault.default).hasOwnProp(transitional, 'encodeBasicAuthUsername') && transitional.encodeBasicAuthUsername === true;
        try {
            headers.set('Authorization', // Preserve legacy username bytes unless the caller opts in to UTF-8.
            'Basic ' + btoa((encodeUsername ? encodeUTF8(username) : username) + ':' + (password ? encodeUTF8(password) : '')));
        } catch (e) {
            throw (0, _axiosErrorJsDefault.default).from(e, (0, _axiosErrorJsDefault.default).ERR_BAD_OPTION_VALUE, config);
        }
    }
    if ((0, _utilsJsDefault.default).isFormData(data)) {
        const getHeaders = (0, _utilsJsDefault.default).getSafeProp(data, 'getHeaders');
        if ((0, _indexJsDefault.default).hasStandardBrowserEnv || (0, _indexJsDefault.default).hasStandardBrowserWebWorkerEnv || (0, _utilsJsDefault.default).isReactNative(data)) headers.setContentType(undefined); // browser/web worker/RN handles it
        else if ((0, _utilsJsDefault.default).isFunction(getHeaders)) // Node.js FormData (like form-data package)
        (0, _setFormDataHeadersJsDefault.default)(headers, getHeaders.call(data), own('formDataHeaderPolicy'));
    }
    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if ((0, _indexJsDefault.default).hasStandardBrowserEnv) {
        if ((0, _utilsJsDefault.default).isFunction(withXSRFToken)) withXSRFToken = withXSRFToken(newConfig);
        // Strict boolean check — prevents proto-pollution gadgets (e.g. Object.prototype.withXSRFToken = 1)
        // and misconfigurations (e.g. "false") from short-circuiting the same-origin check and leaking
        // the XSRF token cross-origin.
        const shouldSendXSRF = withXSRFToken === true || withXSRFToken == null && (0, _isURLSameOriginJsDefault.default)(newConfig.url);
        if (shouldSendXSRF) {
            const xsrfValue = xsrfHeaderName && xsrfCookieName && readXsrfCookie(xsrfCookieName);
            if (xsrfValue) headers.set(xsrfHeaderName, xsrfValue);
        }
    }
    return newConfig;
}
exports.default = resolveConfig;

},{"../platform/index.js":"9GYUB","../utils.js":"3iykr","../core/AxiosError.js":"1ZnKZ","./isURLSameOrigin.js":"gHq9j","./cookies.js":"7TOhl","../core/buildFullPath.js":"abv3S","../core/mergeConfig.js":"5u78U","../core/AxiosHeaders.js":"47lYE","../core/setFormDataHeaders.js":"cPKKN","./buildURL.js":"5tRJE","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"gHq9j":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
exports.default = (0, _indexJsDefault.default).hasStandardBrowserEnv ? ((origin)=>(url)=>{
        url = new URL(url, document.baseURI || (0, _indexJsDefault.default).origin);
        return origin.protocol === url.protocol && origin.host === url.host && origin.port === url.port;
    })(new URL((0, _indexJsDefault.default).origin)) : ()=>true;

},{"../platform/index.js":"9GYUB","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"abv3S":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>buildFullPath);
var _axiosErrorJs = require("./AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _isAbsoluteURLJs = require("../helpers/isAbsoluteURL.js");
var _isAbsoluteURLJsDefault = parcelHelpers.interopDefault(_isAbsoluteURLJs);
var _combineURLsJs = require("../helpers/combineURLs.js");
var _combineURLsJsDefault = parcelHelpers.interopDefault(_combineURLsJs);
var _normalizeURLForProtocolCheckJs = require("../helpers/normalizeURLForProtocolCheck.js");
var _normalizeURLForProtocolCheckJsDefault = parcelHelpers.interopDefault(_normalizeURLForProtocolCheckJs);
'use strict';
const malformedHttpProtocol = /^https?:(?!\/\/)/i;
// Redact the parts of a URL that can carry secrets before it is embedded in an
// error message. AxiosError.toJSON() serializes `message` verbatim and errors
// are commonly logged, while the opt-in `config.redact` model only cleans
// config keys — it cannot reach the message. Redact only the genuinely
// sensitive substrings — userinfo (credentials), query parameter values and
// fragment contents — with the same REDACTED marker the config redaction uses,
// while keeping the scheme, host, path and parameter names so the offending
// request stays accurately identifiable.
function redactFragment(fragment) {
    if (!fragment) return fragment;
    return fragment.replace(/(^|&)([^=&]*=)?[^&]+/g, (match, separator, parameterName = '')=>{
        return `${separator}${parameterName}${0, _axiosErrorJs.REDACTED}`;
    });
}
function redactSensitiveURLParts(url) {
    const redactedURL = url.replace(/^(https?:\/{0,2})[^/?#]*@/i, `$1${(0, _axiosErrorJs.REDACTED)}@`);
    const fragmentIndex = redactedURL.indexOf('#');
    const urlWithoutFragment = fragmentIndex === -1 ? redactedURL : redactedURL.slice(0, fragmentIndex);
    const redactedURLWithoutFragment = urlWithoutFragment.replace(/([?&][^=&#]*=)[^&#]*/g, `$1${(0, _axiosErrorJs.REDACTED)}`);
    if (fragmentIndex === -1) return redactedURLWithoutFragment;
    return `${redactedURLWithoutFragment}#${redactFragment(redactedURL.slice(fragmentIndex + 1))}`;
}
function assertValidHttpProtocolURL(url, config) {
    if (typeof url === 'string') {
        const normalizedURL = (0, _normalizeURLForProtocolCheckJsDefault.default)(url);
        if (malformedHttpProtocol.test(normalizedURL)) throw new (0, _axiosErrorJsDefault.default)(`Invalid URL ${JSON.stringify(redactSensitiveURLParts(normalizedURL))}: missing "//" after protocol`, (0, _axiosErrorJsDefault.default).ERR_INVALID_URL, config);
    }
}
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls, config) {
    assertValidHttpProtocolURL(requestedURL, config);
    let isRelativeUrl = !(0, _isAbsoluteURLJsDefault.default)(requestedURL);
    if (baseURL && (isRelativeUrl || allowAbsoluteUrls === false)) {
        assertValidHttpProtocolURL(baseURL, config);
        return (0, _combineURLsJsDefault.default)(baseURL, requestedURL);
    }
    return requestedURL;
}

},{"./AxiosError.js":"1ZnKZ","../helpers/isAbsoluteURL.js":"lpN3K","../helpers/combineURLs.js":"cceuC","../helpers/normalizeURLForProtocolCheck.js":"37bDM","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"lpN3K":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>isAbsoluteURL);
'use strict';
function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    if (typeof url !== 'string') return false;
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"cceuC":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>combineURLs);
'use strict';
function combineURLs(baseURL, relativeURL) {
    if (!relativeURL) return baseURL;
    let end = baseURL.length;
    while(end > 0 && baseURL.charCodeAt(end - 1) === 47)end--;
    return baseURL.slice(0, end) + '/' + relativeURL.replace(/^\/+/, '');
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"5u78U":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>mergeConfig);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosHeadersJs = require("./AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
var _assertParamsAcyclicJs = require("./assertParamsAcyclic.js");
var _assertParamsAcyclicJsDefault = parcelHelpers.interopDefault(_assertParamsAcyclicJs);
'use strict';
const headersToObject = (thing)=>thing instanceof (0, _axiosHeadersJsDefault.default) ? {
        ...thing
    } : thing;
const ownEnumerableKeys = (thing)=>{
    if (Object.getOwnPropertySymbols && Object.getOwnPropertyDescriptor) return Object.keys(thing).concat(Object.getOwnPropertySymbols(thing).filter((symbol)=>{
        const descriptor = Object.getOwnPropertyDescriptor(thing, symbol);
        return descriptor && descriptor.enumerable;
    }));
    return Object.keys(thing);
};
// Copy params without recursive merges so the serializer remains responsible
// for its depth policy. Only visit defaults that contribute to the result.
function mergeParams(a, b) {
    const pending = [];
    const copies = new WeakMap();
    const empty = {};
    function copy(target, source) {
        if (!(0, _utilsJsDefault.default).isPlainObject(source)) return (0, _utilsJsDefault.default).isArray(source) ? source.slice() : source;
        const base = (0, _utilsJsDefault.default).isPlainObject(target) ? target : empty;
        let bases = copies.get(source);
        if (!bases) {
            bases = new WeakMap();
            copies.set(source, bases);
        }
        if (bases.has(base)) return bases.get(base);
        const result = {};
        bases.set(base, result);
        pending.push({
            base,
            source,
            result
        });
        return result;
    }
    const result = (0, _utilsJsDefault.default).isUndefined(b) ? copy(undefined, a) : copy(a, b);
    while(pending.length){
        const { base, source, result: target } = pending.pop();
        const baseKeys = new Set(ownEnumerableKeys(base));
        const sourceKeys = new Set(ownEnumerableKeys(source));
        const keys = new Set([
            ...baseKeys,
            ...sourceKeys
        ]);
        keys.forEach((key)=>{
            if (key === '__proto__' || key === 'constructor' || key === 'prototype') return;
            const hasSource = sourceKeys.has(key);
            const value = hasSource ? source[key] : undefined;
            const previous = (!hasSource || (0, _utilsJsDefault.default).isPlainObject(value)) && baseKeys.has(key) ? base[key] : undefined;
            target[key] = hasSource ? copy(previous, value) : copy(undefined, previous);
        });
    }
    (0, _assertParamsAcyclicJsDefault.default)(result);
    return result;
}
function getMergedValue(target, source, prop, caseless) {
    if ((0, _utilsJsDefault.default).isPlainObject(target) && (0, _utilsJsDefault.default).isPlainObject(source)) return (0, _utilsJsDefault.default).merge.call({
        caseless
    }, target, source);
    else if ((0, _utilsJsDefault.default).isPlainObject(source)) return (0, _utilsJsDefault.default).merge({}, source);
    else if ((0, _utilsJsDefault.default).isArray(source)) return source.slice();
    return source;
}
function mergeDeepProperties(a, b, prop, caseless) {
    if (!(0, _utilsJsDefault.default).isUndefined(b)) return getMergedValue(a, b, prop, caseless);
    else if (!(0, _utilsJsDefault.default).isUndefined(a)) return getMergedValue(undefined, a, prop, caseless);
}
// eslint-disable-next-line consistent-return
function valueFromConfig2(a, b) {
    if (!(0, _utilsJsDefault.default).isUndefined(b)) return getMergedValue(undefined, b);
}
// eslint-disable-next-line consistent-return
function defaultToConfig2(a, b) {
    if (!(0, _utilsJsDefault.default).isUndefined(b)) return getMergedValue(undefined, b);
    else if (!(0, _utilsJsDefault.default).isUndefined(a)) return getMergedValue(undefined, a);
}
function getMergedTransitionalOption(config1, config2, prop) {
    const transitional2 = (0, _utilsJsDefault.default).hasOwnProp(config2, 'transitional') ? config2.transitional : undefined;
    if (!(0, _utilsJsDefault.default).isUndefined(transitional2)) {
        if ((0, _utilsJsDefault.default).isPlainObject(transitional2)) {
            if ((0, _utilsJsDefault.default).hasOwnProp(transitional2, prop)) return transitional2[prop];
        } else return undefined;
    }
    const transitional1 = (0, _utilsJsDefault.default).hasOwnProp(config1, 'transitional') ? config1.transitional : undefined;
    if ((0, _utilsJsDefault.default).isPlainObject(transitional1) && (0, _utilsJsDefault.default).hasOwnProp(transitional1, prop)) return transitional1[prop];
    return undefined;
}
// eslint-disable-next-line consistent-return
function mergeDirectKeys(a, b, prop, config1, config2) {
    if ((0, _utilsJsDefault.default).hasOwnProp(config2, prop)) return getMergedValue(a, b);
    else if ((0, _utilsJsDefault.default).hasOwnProp(config1, prop)) return getMergedValue(undefined, a);
}
function mergeHeaders(a, b, prop) {
    return mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true);
}
// Null-proto, frozen descriptor so a polluted Object.prototype.get cannot turn
// this data descriptor into an accessor descriptor on the way in.
// defineProperty only reads it, so one shared instance serves every call.
const hasOwnPropertyDescriptor = Object.freeze({
    __proto__: null,
    value: Object.prototype.hasOwnProperty,
    enumerable: false,
    writable: true,
    configurable: true
});
// The strategy table and the strategies above are stateless, so they are
// built once at module load instead of on every call: mergeConfig runs at
// most twice per request (once from a method alias, once from `_request`).
const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    params: mergeParams,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutErrorMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    allowedSocketPaths: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: mergeHeaders
};
function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config1 = config1 || {};
    config2 = config2 || {};
    // Use a null-prototype object so that downstream reads such as `config.auth`
    // or `config.baseURL` cannot inherit polluted values from Object.prototype.
    // `hasOwnProperty` is restored as a non-enumerable own slot to preserve
    // ergonomics for user code that relies on it.
    const config = Object.create(null);
    Object.defineProperty(config, 'hasOwnProperty', hasOwnPropertyDescriptor);
    const keys = ownEnumerableKeys({
        ...config1,
        ...config2
    });
    for(let i = 0, len = keys.length; i < len; i++){
        const prop = keys[i];
        if (prop === '__proto__' || prop === 'constructor' || prop === 'prototype') continue;
        const merge = (0, _utilsJsDefault.default).hasOwnProp(mergeMap, prop) ? mergeMap[prop] : mergeDeepProperties;
        const a = (0, _utilsJsDefault.default).hasOwnProp(config1, prop) ? config1[prop] : undefined;
        const b = (0, _utilsJsDefault.default).hasOwnProp(config2, prop) ? config2[prop] : undefined;
        const configValue = merge === mergeDirectKeys ? merge(a, b, prop, config1, config2) : merge(a, b, prop);
        (0, _utilsJsDefault.default).isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
    }
    if ((0, _utilsJsDefault.default).hasOwnProp(config2, 'validateStatus') && (0, _utilsJsDefault.default).isUndefined(config2.validateStatus) && getMergedTransitionalOption(config1, config2, 'validateStatusUndefinedResolves') === false) {
        if ((0, _utilsJsDefault.default).hasOwnProp(config1, 'validateStatus')) config.validateStatus = getMergedValue(undefined, config1.validateStatus);
        else delete config.validateStatus;
    }
    return config;
}

},{"../utils.js":"3iykr","./AxiosHeaders.js":"47lYE","./assertParamsAcyclic.js":"k3wi8","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"k3wi8":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>assertParamsAcyclic);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosErrorJs = require("./AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
'use strict';
function assertParamsAcyclic(params) {
    const pending = [
        {
            value: params
        }
    ];
    const active = new WeakSet();
    const visited = new WeakSet();
    while(pending.length){
        const { value, done } = pending.pop();
        if (!(0, _utilsJsDefault.default).isPlainObject(value) && !(0, _utilsJsDefault.default).isArray(value)) continue;
        if (done) {
            active.delete(value);
            continue;
        }
        if (active.has(value)) throw new (0, _axiosErrorJsDefault.default)('Circular reference detected in params', (0, _axiosErrorJsDefault.default).ERR_BAD_OPTION_VALUE);
        if (visited.has(value)) continue;
        visited.add(value);
        active.add(value);
        pending.push({
            value,
            done: true
        });
        const keys = Object.keys(value);
        if (Object.getOwnPropertySymbols && Object.getOwnPropertyDescriptor) Object.getOwnPropertySymbols(value).forEach((key)=>{
            const descriptor = Object.getOwnPropertyDescriptor(value, key);
            if (descriptor && descriptor.enumerable) keys.push(key);
        });
        // Shallow array elements retain fields filtered during plain-object merges.
        // Inspect reserved data properties without evaluating their accessors.
        keys.forEach((key)=>{
            if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
                const descriptor = Object.getOwnPropertyDescriptor(value, key);
                if (descriptor && (0, _utilsJsDefault.default).hasOwnProp(descriptor, 'value')) pending.push({
                    value: descriptor.value
                });
            } else pending.push({
                value: value[key]
            });
        });
    }
}

},{"../utils.js":"3iykr","./AxiosError.js":"1ZnKZ","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"cPKKN":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>setFormDataHeaders);
'use strict';
const FORM_DATA_CONTENT_HEADERS = [
    'content-type',
    'content-length'
];
function setFormDataHeaders(headers, formHeaders, policy) {
    if (policy !== 'content-only') {
        headers.set(formHeaders);
        return;
    }
    Object.entries(formHeaders || {}).forEach(([key, val])=>{
        if (FORM_DATA_CONTENT_HEADERS.includes(key.toLowerCase())) headers.set(key, val);
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"iIplg":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getFetch", ()=>getFetch);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _composeSignalsJs = require("../helpers/composeSignals.js");
var _composeSignalsJsDefault = parcelHelpers.interopDefault(_composeSignalsJs);
var _trackStreamJs = require("../helpers/trackStream.js");
var _createMultipartBodyJs = require("../core/createMultipartBody.js");
var _createMultipartBodyJsDefault = parcelHelpers.interopDefault(_createMultipartBodyJs);
var _axiosHeadersJs = require("../core/AxiosHeaders.js");
var _axiosHeadersJsDefault = parcelHelpers.interopDefault(_axiosHeadersJs);
var _progressEventReducerJs = require("../helpers/progressEventReducer.js");
var _resolveConfigJs = require("../helpers/resolveConfig.js");
var _resolveConfigJsDefault = parcelHelpers.interopDefault(_resolveConfigJs);
var _settleJs = require("../core/settle.js");
var _settleJsDefault = parcelHelpers.interopDefault(_settleJs);
var _estimateDataURLDecodedBytesJs = require("../helpers/estimateDataURLDecodedBytes.js");
var _estimateDataURLDecodedBytesJsDefault = parcelHelpers.interopDefault(_estimateDataURLDecodedBytesJs);
var _dataJs = require("../env/data.js");
var _sanitizeHeaderValueJs = require("../helpers/sanitizeHeaderValue.js");
const DEFAULT_CHUNK_SIZE = 65536;
const DEFAULT_REQUEST_OPTIONS = {
    cache: 'default',
    redirect: 'follow',
    referrer: 'about:client',
    referrerPolicy: '',
    mode: 'cors',
    integrity: '',
    keepalive: false,
    priority: 'auto',
    window: null
};
const { isFunction } = (0, _utilsJsDefault.default);
/**
 * Encode a UTF-8 string to a Latin-1 byte string for use with btoa().
 * This is a modern replacement for the deprecated unescape(encodeURIComponent(str)) pattern.
 *
 * @param {string} str The string to encode
 *
 * @returns {string} UTF-8 bytes as a Latin-1 string
 */ const encodeUTF8 = (str)=>encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex)=>String.fromCharCode(parseInt(hex, 16)));
// Node's WHATWG URL parser returns `username` and `password` percent-encoded.
// Decode before composing the `auth` option so credentials such as
// `my%40email.com:pass` are sent as `my@email.com:pass`. Falls back to the
// original value for malformed input so a bad encoding never throws.
const decodeURIComponentSafe = (value)=>{
    if (!(0, _utilsJsDefault.default).isString(value)) return value;
    try {
        return decodeURIComponent(value);
    } catch (error) {
        return value;
    }
};
const test = (fn, ...args)=>{
    try {
        return !!fn(...args);
    } catch (e) {
        return false;
    }
};
const maybeWithAuthCredentials = (url)=>{
    const protocolIndex = url.indexOf('://');
    let urlToCheck = url;
    if (protocolIndex !== -1) urlToCheck = urlToCheck.slice(protocolIndex + 3);
    return urlToCheck.includes('@') || urlToCheck.includes(':');
};
const factory = (env)=>{
    const globalObject = (0, _utilsJsDefault.default).global !== undefined && (0, _utilsJsDefault.default).global !== null ? (0, _utilsJsDefault.default).global : globalThis;
    const { ReadableStream, TextEncoder } = globalObject;
    env = (0, _utilsJsDefault.default).merge.call({
        skipUndefined: true
    }, {
        Request: globalObject.Request,
        Response: globalObject.Response,
        Blob: globalObject.Blob
    }, env);
    const envFetch = (0, _utilsJsDefault.default).hasOwnProp(env, 'fetch') ? env.fetch : undefined;
    const { Request, Response, Blob } = env;
    const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === 'function';
    const isRequestSupported = isFunction(Request);
    const isResponseSupported = isFunction(Response);
    if (!isFetchSupported) return false;
    const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream);
    const encodeText = isFetchSupported && (typeof TextEncoder === 'function' ? ((encoder)=>(str)=>encoder.encode(str))(new TextEncoder()) : async (str)=>new Uint8Array(await new Request(str).arrayBuffer()));
    const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(()=>{
        let duplexAccessed = false;
        const request = new Request((0, _indexJsDefault.default).origin, {
            body: new ReadableStream(),
            method: 'POST',
            get duplex () {
                duplexAccessed = true;
                return 'half';
            }
        });
        const hasContentType = request.headers.has('Content-Type');
        if (request.body != null) request.body.cancel();
        return duplexAccessed && !hasContentType;
    });
    const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(()=>(0, _utilsJsDefault.default).isReadableStream(new Response('').body));
    // Some runtimes reject every explicit cache mode. Use own defaults for both
    // probes so unrelated polluted options cannot affect cache-mode detection.
    const requestDefaults = Object.assign(Object.create(null), DEFAULT_REQUEST_OPTIONS);
    if (isRequestSupported && !test(()=>new Request((0, _indexJsDefault.default).origin, requestDefaults))) {
        delete requestDefaults.cache;
        // Only omit cache when that makes Request construction succeed. Otherwise
        // retain the explicit default that protects supporting runtimes from pollution.
        if (!test(()=>new Request((0, _indexJsDefault.default).origin, requestDefaults))) requestDefaults.cache = DEFAULT_REQUEST_OPTIONS.cache;
    }
    const resolvers = {
        stream: supportsResponseStream && ((res)=>res.body)
    };
    isFetchSupported && (()=>{
        [
            'text',
            'arrayBuffer',
            'blob',
            'formData',
            'stream'
        ].forEach((type)=>{
            !resolvers[type] && (resolvers[type] = (res, config)=>{
                let method = res && res[type];
                if (method) return method.call(res);
                throw new (0, _axiosErrorJsDefault.default)(`Response type '${type}' is not supported`, (0, _axiosErrorJsDefault.default).ERR_NOT_SUPPORT, config);
            });
        });
    })();
    const getBodyLength = async (body)=>{
        if (body == null) return 0;
        if ((0, _utilsJsDefault.default).isBlob(body)) return body.size;
        if ((0, _utilsJsDefault.default).isArrayBufferView(body) || (0, _utilsJsDefault.default).isArrayBuffer(body)) return body.byteLength;
        if ((0, _utilsJsDefault.default).isURLSearchParams(body)) body = body + '';
        if ((0, _utilsJsDefault.default).isString(body)) return (await encodeText(body)).byteLength;
    };
    const resolveBodyLength = async (headers, body)=>{
        const length = (0, _utilsJsDefault.default).toFiniteNumber(headers.getContentLength());
        return length == null ? getBodyLength(body) : length;
    };
    return async (config)=>{
        let { url, method, data, signal, cancelToken, timeout, onDownloadProgress, onUploadProgress, responseType, headers, withCredentials = 'same-origin', fetchOptions, maxContentLength, maxBodyLength, maxRedirects } = (0, _resolveConfigJsDefault.default)(config);
        const hasMaxContentLength = (0, _utilsJsDefault.default).isNumber(maxContentLength) && maxContentLength > -1;
        const hasMaxBodyLength = (0, _utilsJsDefault.default).isNumber(maxBodyLength) && maxBodyLength > -1;
        const own = (key)=>(0, _utilsJsDefault.default).hasOwnProp(config, key) ? config[key] : undefined;
        let _fetch = envFetch || fetch;
        responseType = responseType ? (responseType + '').toLowerCase() : 'text';
        let composedSignal = (0, _composeSignalsJsDefault.default)([
            signal,
            cancelToken && cancelToken.toAbortSignal()
        ], timeout);
        let request = null;
        const unsubscribe = composedSignal && composedSignal.unsubscribe && (()=>{
            composedSignal.unsubscribe();
        });
        let requestContentLength;
        // AxiosErrors we raise while request or response bodies are being streamed. Captured
        // by identity so the catch block can surface it directly, regardless of
        // how the runtime wraps the resulting fetch rejection (undici exposes it
        // as `err.cause`; some browsers drop the original error entirely).
        let pendingBodyError = null;
        let pendingResponseError = null;
        const maxBodyLengthError = ()=>new (0, _axiosErrorJsDefault.default)('Request body larger than maxBodyLength limit', (0, _axiosErrorJsDefault.default).ERR_BAD_REQUEST, config, request);
        try {
            // HTTP basic authentication
            let auth = undefined;
            const configAuth = own('auth');
            if (configAuth) {
                const username = (0, _utilsJsDefault.default).getSafeProp(configAuth, 'username') || '';
                const password = (0, _utilsJsDefault.default).getSafeProp(configAuth, 'password') || '';
                auth = {
                    username,
                    password
                };
            }
            let parsedURL;
            if (maybeWithAuthCredentials(url)) {
                parsedURL = new URL(url, (0, _indexJsDefault.default).origin);
                if (!auth && (parsedURL.username || parsedURL.password)) {
                    const urlUsername = decodeURIComponentSafe(parsedURL.username);
                    const urlPassword = decodeURIComponentSafe(parsedURL.password);
                    auth = {
                        username: urlUsername,
                        password: urlPassword
                    };
                }
                if (parsedURL.username || parsedURL.password) {
                    parsedURL.username = '';
                    parsedURL.password = '';
                    url = parsedURL.href;
                }
            }
            if (auth) {
                headers.delete('authorization');
                headers.set('Authorization', 'Basic ' + btoa(encodeUTF8((auth.username || '') + ':' + (auth.password || ''))));
            }
            // Enforce maxContentLength for data: URLs up-front so we never materialize
            // an oversized payload. The HTTP adapter applies the same check (see http.js
            // "if (protocol === 'data:')" branch).
            if (hasMaxContentLength && parsedURL && parsedURL.protocol === 'data:') {
                const estimated = (0, _estimateDataURLDecodedBytesJsDefault.default)(parsedURL.href);
                if (estimated > maxContentLength) throw new (0, _axiosErrorJsDefault.default)('maxContentLength size of ' + maxContentLength + ' exceeded', (0, _axiosErrorJsDefault.default).ERR_BAD_RESPONSE, config, request);
            }
            const formContentType = (0, _utilsJsDefault.default).isSpecCompliantForm(data) && (0, _axiosHeadersJsDefault.default).from(own('headers')).getContentType();
            let formBoundary;
            if ((0, _utilsJsDefault.default).isString(formContentType) && /^multipart\/form-data(?:\s*;|$)/i.test(formContentType.trim())) {
                const parameters = (0, _axiosHeadersJsDefault.default).parseParameters(formContentType);
                if ((0, _utilsJsDefault.default).hasOwnProp(parameters, 'boundary')) formBoundary = parameters.boundary;
            }
            if ((0, _utilsJsDefault.default).isSpecCompliantForm(data) && method !== 'get' && method !== 'head' && (hasMaxBodyLength || onUploadProgress && supportsRequestStream || formBoundary !== undefined)) {
                data = (0, _createMultipartBodyJsDefault.default)(data, Blob, hasMaxBodyLength ? maxBodyLength : Infinity, maxBodyLengthError, formBoundary);
                // Blob.type lowercases its value, including a case-sensitive boundary.
                // Retain the caller's header when an explicit boundary was serialized.
                headers.setContentType(formBoundary === undefined ? data.type : formContentType);
                requestContentLength = data.size;
            }
            // Enforce maxBodyLength against known-size bodies before dispatch using
            // the body's *actual* size — never a caller-declared Content-Length,
            // which could under-report to slip an oversized body past the check.
            // Unknown-size streams return undefined here and are counted per-chunk
            // below as fetch consumes them.
            if (hasMaxBodyLength && method !== 'get' && method !== 'head') {
                const outboundLength = await getBodyLength(data);
                if (typeof outboundLength === 'number' && isFinite(outboundLength)) {
                    requestContentLength = outboundLength;
                    if (outboundLength > maxBodyLength) throw maxBodyLengthError();
                }
            }
            // A streamed body under maxBodyLength must be counted as fetch consumes
            // it; its size is never trusted from a caller-declared Content-Length.
            const mustEnforceStreamBody = hasMaxBodyLength && ((0, _utilsJsDefault.default).isReadableStream(data) || (0, _utilsJsDefault.default).isStream(data));
            const trackRequestStream = (stream, onProgress, flush)=>(0, _trackStreamJs.trackStream)(stream, DEFAULT_CHUNK_SIZE, (loadedBytes)=>{
                    if (hasMaxBodyLength && loadedBytes > maxBodyLength) throw pendingBodyError = maxBodyLengthError();
                    onProgress && onProgress(loadedBytes);
                }, flush);
            if (supportsRequestStream && method !== 'get' && method !== 'head' && (onUploadProgress || mustEnforceStreamBody)) {
                requestContentLength = requestContentLength == null ? await resolveBodyLength(headers, data) : requestContentLength;
                // A declared length of 0 is only trusted to skip the wrap when we are
                // not enforcing a stream limit (which must not rely on that header).
                if (requestContentLength !== 0 || mustEnforceStreamBody) {
                    let _request = new Request(url, {
                        method: 'POST',
                        body: data,
                        duplex: 'half'
                    });
                    let contentTypeHeader;
                    if ((0, _utilsJsDefault.default).isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) headers.setContentType(contentTypeHeader);
                    if (_request.body) {
                        const [onProgress, flush] = onUploadProgress && (0, _progressEventReducerJs.progressEventDecorator)(requestContentLength, (0, _progressEventReducerJs.progressEventReducer)((0, _progressEventReducerJs.asyncDecorator)(onUploadProgress))) || [];
                        data = trackRequestStream(_request.body, onProgress, flush);
                    }
                }
            } else if (mustEnforceStreamBody && !isRequestSupported && isReadableStreamSupported && method !== 'get' && method !== 'head') data = trackRequestStream(data);
            else if (mustEnforceStreamBody && isRequestSupported && !supportsRequestStream && method !== 'get' && method !== 'head') throw new (0, _axiosErrorJsDefault.default)('Stream request bodies are not supported by the current fetch implementation', (0, _axiosErrorJsDefault.default).ERR_NOT_SUPPORT, config, request);
            if (!(0, _utilsJsDefault.default).isString(withCredentials)) withCredentials = withCredentials ? 'include' : 'omit';
            // Cloudflare Workers throws when credentials are defined
            // see https://github.com/cloudflare/workerd/issues/902
            const isCredentialsSupported = isRequestSupported && 'credentials' in Request.prototype;
            // If data is FormData and Content-Type is multipart/form-data without boundary,
            // delete it so fetch can set it correctly with the boundary
            if ((0, _utilsJsDefault.default).isFormData(data)) {
                const contentType = headers.getContentType();
                if (contentType && /^multipart\/form-data/i.test(contentType) && !/boundary=/i.test(contentType)) headers.delete('content-type');
            }
            // Set User-Agent header if not already set (fetch defaults to 'node' in Node.js)
            headers.set('User-Agent', 'axios/' + (0, _dataJs.VERSION), false);
            const safeFetchOptions = fetchOptions == null ? fetchOptions : Object.assign(Object.create(null), fetchOptions);
            if (safeFetchOptions) {
                // These options are owned by Axios and are already reflected in the
                // resolved Request passed to fetch.
                delete safeFetchOptions.body;
                delete safeFetchOptions.headers;
                delete safeFetchOptions.method;
                delete safeFetchOptions.signal;
                delete safeFetchOptions.duplex;
                delete safeFetchOptions.credentials;
            }
            const resolvedOptions = Object.assign(Object.create(null), safeFetchOptions, {
                signal: composedSignal,
                method: method.toUpperCase(),
                headers: (0, _sanitizeHeaderValueJs.toByteStringHeaderObject)(headers.normalize()),
                body: data,
                duplex: 'half',
                credentials: isCredentialsSupported ? withCredentials : undefined
            });
            if (isRequestSupported) {
                (0, _utilsJsDefault.default).forEach(requestDefaults, (value, key)=>{
                    if (resolvedOptions[key] === undefined) resolvedOptions[key] = value;
                });
                if (resolvedOptions.signal === undefined) resolvedOptions.signal = null;
                if (resolvedOptions.body === undefined) resolvedOptions.body = null;
            }
            if (maxRedirects === 0) {
                resolvedOptions.redirect = 'manual';
                if (safeFetchOptions) safeFetchOptions.redirect = 'manual';
            }
            request = isRequestSupported && new Request(url, resolvedOptions);
            let response = await (isRequestSupported ? _fetch(request, safeFetchOptions) : _fetch(url, resolvedOptions));
            const responseHeaders = (0, _axiosHeadersJsDefault.default).from(response.headers);
            // Cheap pre-check: if the server honestly declares a content-length that
            // already exceeds the cap, reject before we start streaming.
            if (hasMaxContentLength) {
                const declaredLength = (0, _utilsJsDefault.default).toFiniteNumber(responseHeaders.getContentLength());
                if (declaredLength != null && declaredLength > maxContentLength) throw new (0, _axiosErrorJsDefault.default)('maxContentLength size of ' + maxContentLength + ' exceeded', (0, _axiosErrorJsDefault.default).ERR_BAD_RESPONSE, config, request);
            }
            const isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');
            if (supportsResponseStream && response.body && (onDownloadProgress || hasMaxContentLength || isStreamResponse && unsubscribe)) {
                const options = {};
                [
                    'status',
                    'statusText',
                    'headers'
                ].forEach((prop)=>{
                    options[prop] = response[prop];
                });
                const responseContentLength = (0, _utilsJsDefault.default).toFiniteNumber(responseHeaders.getContentLength());
                const [onProgress, flush] = onDownloadProgress && (0, _progressEventReducerJs.progressEventDecorator)(responseContentLength, (0, _progressEventReducerJs.progressEventReducer)((0, _progressEventReducerJs.asyncDecorator)(onDownloadProgress), true)) || [];
                let bytesRead = 0;
                const onChunkProgress = (loadedBytes)=>{
                    if (hasMaxContentLength) {
                        bytesRead = loadedBytes;
                        if (bytesRead > maxContentLength) throw pendingResponseError = new (0, _axiosErrorJsDefault.default)('maxContentLength size of ' + maxContentLength + ' exceeded', (0, _axiosErrorJsDefault.default).ERR_BAD_RESPONSE, config, request);
                    }
                    onProgress && onProgress(loadedBytes);
                };
                response = new Response((0, _trackStreamJs.trackStream)(response.body, DEFAULT_CHUNK_SIZE, onChunkProgress, ()=>{
                    flush && flush();
                    unsubscribe && unsubscribe();
                }), options);
            }
            responseType = responseType || 'text';
            let responseData = await resolvers[(0, _utilsJsDefault.default).findKey(resolvers, responseType) || 'text'](response, config);
            // Fallback enforcement for environments without ReadableStream support
            // (legacy runtimes). Detect materialized size from typed output; skip
            // streams/Response passthrough since the user will read those themselves.
            if (hasMaxContentLength && !supportsResponseStream && !isStreamResponse) {
                let materializedSize;
                if (responseData != null) {
                    if (typeof responseData.byteLength === 'number') materializedSize = responseData.byteLength;
                    else if (typeof responseData.size === 'number') materializedSize = responseData.size;
                    else if (typeof responseData === 'string') materializedSize = typeof TextEncoder === 'function' ? new TextEncoder().encode(responseData).byteLength : responseData.length;
                }
                if (typeof materializedSize === 'number' && materializedSize > maxContentLength) throw new (0, _axiosErrorJsDefault.default)('maxContentLength size of ' + maxContentLength + ' exceeded', (0, _axiosErrorJsDefault.default).ERR_BAD_RESPONSE, config, request);
            }
            !isStreamResponse && unsubscribe && unsubscribe();
            return await new Promise((resolve, reject)=>{
                (0, _settleJsDefault.default)(resolve, reject, {
                    data: responseData,
                    headers: (0, _axiosHeadersJsDefault.default).from(response.headers),
                    status: response.status,
                    statusText: response.statusText,
                    config,
                    request
                });
            });
        } catch (err) {
            unsubscribe && unsubscribe();
            // Safari can surface fetch aborts as a DOMException-like object whose
            // branded getters throw. Prefer our composed signal reason before reading
            // the caught error, preserving timeout vs cancellation semantics.
            if (composedSignal && composedSignal.aborted && composedSignal.reason instanceof (0, _axiosErrorJsDefault.default)) {
                const canceledError = composedSignal.reason;
                canceledError.config = config;
                request && (canceledError.request = request);
                if (err !== canceledError) // Non-enumerable to match native Error `cause` semantics so loggers
                // don't recurse into circular fetch internals (see #7205).
                Object.defineProperty(canceledError, 'cause', {
                    __proto__: null,
                    value: err,
                    writable: true,
                    enumerable: false,
                    configurable: true
                });
                throw canceledError;
            }
            // Surface a maxBodyLength violation we raised while the request body was
            // being streamed. Keeping the original error (rather than reading
            // `err.cause.isAxiosError`) keeps the error deterministic across runtimes
            // and avoids both prototype-pollution reads and mis-attributing a foreign
            // AxiosError that merely happened to land in `err.cause`.
            if (pendingBodyError) {
                request && !pendingBodyError.request && (pendingBodyError.request = request);
                throw pendingBodyError;
            }
            if (pendingResponseError) throw pendingResponseError;
            // Re-throw AxiosErrors we raised synchronously (data: URL / content-length
            // pre-checks, response size enforcement) without re-wrapping them.
            if (err instanceof (0, _axiosErrorJsDefault.default)) {
                request && !err.request && (err.request = request);
                throw err;
            }
            if (err && err.name === 'TypeError' && /Load failed|fetch/i.test(err.message)) {
                const networkError = new (0, _axiosErrorJsDefault.default)('Network Error', (0, _axiosErrorJsDefault.default).ERR_NETWORK, config, request, err && err.response);
                // Non-enumerable to match native Error `cause` semantics so loggers
                // don't recurse into circular fetch internals (see #7205).
                Object.defineProperty(networkError, 'cause', {
                    __proto__: null,
                    value: err.cause || err,
                    writable: true,
                    enumerable: false,
                    configurable: true
                });
                throw networkError;
            }
            throw (0, _axiosErrorJsDefault.default).from(err, err && err.code, config, request, err && err.response);
        }
    };
};
const seedCache = new Map();
const getFetch = (config)=>{
    const env = Object.create(null);
    const configuredEnv = config && (0, _utilsJsDefault.default).hasOwnProp(config, 'env') && config.env;
    [
        'fetch',
        'Request',
        'Response',
        'Blob'
    ].forEach((key)=>{
        if (configuredEnv && (0, _utilsJsDefault.default).hasOwnProp(configuredEnv, key)) env[key] = configuredEnv[key];
    });
    const { fetch: fetch1, Request, Response, Blob } = env;
    const seeds = [
        Request,
        Response,
        fetch1,
        Blob
    ];
    let len = seeds.length, i = len, seed, target, map = seedCache;
    while(i--){
        seed = seeds[i];
        target = map.get(seed);
        target === undefined && map.set(seed, target = i ? new Map() : factory(env));
        map = target;
    }
    return target;
};
const adapter = getFetch();
exports.default = adapter;

},{"../platform/index.js":"9GYUB","../utils.js":"3iykr","../core/AxiosError.js":"1ZnKZ","../helpers/composeSignals.js":"3Rh5o","../helpers/trackStream.js":"1OlEI","../core/createMultipartBody.js":"7TtYA","../core/AxiosHeaders.js":"47lYE","../helpers/progressEventReducer.js":"lY2DP","../helpers/resolveConfig.js":"37JYD","../core/settle.js":"1R8jV","../helpers/estimateDataURLDecodedBytes.js":"23LSP","../env/data.js":"dtnmo","../helpers/sanitizeHeaderValue.js":"c1bLO","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"3Rh5o":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _canceledErrorJs = require("../cancel/CanceledError.js");
var _canceledErrorJsDefault = parcelHelpers.interopDefault(_canceledErrorJs);
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
const composeSignals = (signals, timeout)=>{
    signals = signals ? signals.filter(Boolean) : [];
    if (!timeout && !signals.length) return;
    const controller = new AbortController();
    let aborted = false;
    const onabort = function(reason) {
        if (!aborted) {
            aborted = true;
            unsubscribe();
            const err = reason instanceof Error ? reason : this.reason;
            controller.abort(err instanceof (0, _axiosErrorJsDefault.default) ? err : new (0, _canceledErrorJsDefault.default)(err instanceof Error ? err.message : err));
        }
    };
    let timer = timeout && setTimeout(()=>{
        timer = null;
        onabort(new (0, _axiosErrorJsDefault.default)(`timeout of ${timeout}ms exceeded`, (0, _axiosErrorJsDefault.default).ETIMEDOUT));
    }, timeout);
    const unsubscribe = ()=>{
        if (!signals) return;
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal)=>{
            const unsubscribeSignal = (0, _utilsJsDefault.default).getSafeProp(signal, 'unsubscribe');
            (0, _utilsJsDefault.default).isFunction(unsubscribeSignal) ? unsubscribeSignal.call(signal, onabort) : signal.removeEventListener('abort', onabort);
        });
        signals = null;
    };
    signals.forEach((signal)=>{
        if (aborted) return;
        if (signal.aborted) {
            onabort.call(signal);
            return;
        }
        signal.addEventListener('abort', onabort, {
            once: true
        });
    });
    const { signal } = controller;
    signal.unsubscribe = ()=>(0, _utilsJsDefault.default).asap(unsubscribe);
    return signal;
};
exports.default = composeSignals;

},{"../cancel/CanceledError.js":"4Mizl","../core/AxiosError.js":"1ZnKZ","../utils.js":"3iykr","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"1OlEI":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "streamChunk", ()=>streamChunk);
parcelHelpers.export(exports, "readBytes", ()=>readBytes);
parcelHelpers.export(exports, "trackStream", ()=>trackStream);
const streamChunk = function*(chunk, chunkSize) {
    let len = chunk.byteLength;
    if (!chunkSize || len < chunkSize) {
        yield chunk;
        return;
    }
    let pos = 0;
    let end;
    while(pos < len){
        end = pos + chunkSize;
        yield chunk.slice(pos, end);
        pos = end;
    }
};
const readBytes = async function*(iterable, chunkSize) {
    for await (const chunk of readStream(iterable))yield* streamChunk(chunk, chunkSize);
};
const readStream = async function*(stream) {
    if (stream[Symbol.asyncIterator]) {
        yield* stream;
        return;
    }
    const reader = stream.getReader();
    try {
        for(;;){
            const { done, value } = await reader.read();
            if (done) break;
            yield value;
        }
    } finally{
        await reader.cancel();
    }
};
const trackStream = (stream, chunkSize, onProgress, onFinish)=>{
    const iterator = readBytes(stream, chunkSize);
    let bytes = 0;
    let done;
    let _onFinish = (e)=>{
        if (!done) {
            done = true;
            onFinish && onFinish(e);
        }
    };
    return new ReadableStream({
        async pull (controller) {
            try {
                const { done, value } = await iterator.next();
                if (done) {
                    _onFinish();
                    controller.close();
                    return;
                }
                let len = value.byteLength;
                if (onProgress) {
                    let loadedBytes = bytes += len;
                    onProgress(loadedBytes);
                }
                controller.enqueue(new Uint8Array(value));
            } catch (err) {
                _onFinish(err);
                throw err;
            }
        },
        cancel (reason) {
            _onFinish(reason);
            return iterator.return();
        }
    }, {
        highWaterMark: 2
    });
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"7TtYA":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>createMultipartBody);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
var _indexJs = require("../platform/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _axiosErrorJs = require("./AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
var _formDataToBlobJs = require("../helpers/formDataToBlob.js");
var _formDataToBlobJsDefault = parcelHelpers.interopDefault(_formDataToBlobJs);
function createMultipartBody(form, Blob, limit, limitError, boundary) {
    // Report missing Blob support before trying to select a random source.
    if (!(0, _utilsJsDefault.default).isFunction(Blob)) throw new (0, _axiosErrorJsDefault.default)('Blob is not supported', (0, _axiosErrorJsDefault.default).ERR_NOT_SUPPORT);
    if (boundary === undefined) {
        if ((0, _utilsJsDefault.default).isFunction((0, _indexJsDefault.default).generateString)) boundary = 'axios-' + (0, _indexJsDefault.default).generateString(36, '0123456789abcdef');
        else {
            const crypto = (0, _utilsJsDefault.default).global.crypto;
            if (!crypto || !(0, _utilsJsDefault.default).isFunction(crypto.getRandomValues)) throw new (0, _axiosErrorJsDefault.default)('Random byte generation is not supported', (0, _axiosErrorJsDefault.default).ERR_NOT_SUPPORT);
            const random = new Uint8Array(18);
            crypto.getRandomValues(random);
            boundary = 'axios-' + Array.from(random, (value)=>('0' + value.toString(16)).slice(-2)).join('');
        }
    }
    try {
        return (0, _formDataToBlobJsDefault.default)(form, Blob, limit, limitError, boundary);
    } catch (error) {
        if (error instanceof (0, _formDataToBlobJs.FormDataError)) {
            const code = error.reason === 'boundary' ? (0, _axiosErrorJsDefault.default).ERR_BAD_OPTION_VALUE : (0, _axiosErrorJsDefault.default).ERR_BAD_REQUEST;
            throw new (0, _axiosErrorJsDefault.default)(error.message, code);
        }
        throw error;
    }
}

},{"../utils.js":"3iykr","../platform/index.js":"9GYUB","./AxiosError.js":"1ZnKZ","../helpers/formDataToBlob.js":"e3nC8","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"e3nC8":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Describe serialization failures independently of any request library.
parcelHelpers.export(exports, "FormDataError", ()=>FormDataError);
parcelHelpers.export(exports, "default", ()=>formDataToBlob);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
const CRLF = '\r\n';
const normalizeLines = (value)=>String(value).replace(/\r\n|\r|\n/g, CRLF);
const escapeName = (value)=>String(value).replace(/[\r\n"]/g, (char)=>char === '\r' ? '%0D' : char === '\n' ? '%0A' : '%22');
// Count UTF-8 bytes without allocating an encoded copy of a field. FormData
// string values normalize line endings; Blob/File contents remain unchanged.
const stringBytes = (value, normalize)=>{
    let length = 0;
    for(let i = 0; i < value.length; i++){
        const code = value.charCodeAt(i);
        if (normalize && (code === 13 || code === 10)) {
            if (code === 13 && value.charCodeAt(i + 1) === 10) i++;
            length += 2;
        } else if (code < 0x80) length++;
        else if (code < 0x800) length += 2;
        else if (code >= 0xd800 && code <= 0xdbff && value.charCodeAt(i + 1) >= 0xdc00 && value.charCodeAt(i + 1) <= 0xdfff) {
            length += 4;
            i++;
        } else length += 3;
    }
    return length;
};
class FormDataError extends TypeError {
    constructor(message, reason){
        super(message);
        this.name = 'FormDataError';
        this.reason = reason;
    }
}
function formDataToBlob(form, Blob, limit, limitError, boundary) {
    if (!(0, _utilsJsDefault.default).isFunction(Blob)) throw new FormDataError('Blob is not supported', 'blob');
    if (!(0, _utilsJsDefault.default).isString(boundary) || !/^[A-Za-z0-9'()+_,./:=? -]{1,70}$/.test(boundary) || / $/.test(boundary)) throw new FormDataError('Invalid multipart boundary', 'boundary');
    const footer = '--' + boundary + '--' + CRLF;
    let length = footer.length;
    const parts = [];
    const checkLength = (extra)=>{
        if (length + extra > limit) throw limitError();
    };
    checkLength(0);
    for (const [name, value] of form){
        const isString = (0, _utilsJsDefault.default).isString(value);
        const valueLength = isString ? stringBytes(value, true) : value.size;
        if (!Number.isFinite(valueLength) || valueLength < 0) throw new FormDataError('Unsupported FormData part size', 'part');
        // Reject large values and names before building normalized header strings.
        checkLength(valueLength + stringBytes(name, true) + (!isString && value.name ? stringBytes(value.name, false) : 0) + (!isString && value.type ? stringBytes(value.type, false) : 0));
        let header = '--' + boundary + CRLF + 'Content-Disposition: form-data; name="' + escapeName(normalizeLines(name)) + '"';
        if (!isString) header += '; filename="' + escapeName((0, _utilsJsDefault.default).isString(value.name) ? value.name : 'blob') + '"' + CRLF + 'Content-Type: ' + String(value.type || 'application/octet-stream').replace(/[\r\n]/g, '');
        header += CRLF + CRLF;
        const partLength = stringBytes(header, false) + valueLength + CRLF.length;
        checkLength(partLength);
        length += partLength;
        parts.push({
            header,
            value,
            isString
        });
    }
    // Native Blob composition retains existing Blob/File data. No file is read
    // and no complete multipart ArrayBuffer is created to determine its length.
    const blobParts = [];
    for (const part of parts)blobParts.push(part.header, part.isString ? normalizeLines(part.value) : part.value, CRLF);
    blobParts.push(footer);
    return new Blob(blobParts, {
        type: 'multipart/form-data; boundary=' + boundary
    });
}

},{"../utils.js":"3iykr","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"23LSP":[function(require,module,exports,__globalThis) {
/**
 * Estimate data: URL byte lengths *without* allocating large buffers.
 * - Fetch percent-decodes a base64 body before decoding it.
 * - Node's Buffer.from(body, 'base64') sizes its backing allocation from the
 *   percent-decoded body, including ignored characters and content after padding.
 * - Non-base64 data is percent-decoded and then encoded as UTF-8.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>estimateDataURLDecodedBytes);
/**
 * Estimate the Buffer backing allocation used after Node's percent-decoding step.
 *
 * @param {string} url
 * @returns {number}
 */ parcelHelpers.export(exports, "estimateDataURLBufferAllocation", ()=>estimateDataURLBufferAllocation);
const isHexDigit = (charCode)=>charCode >= 48 && charCode <= 57 || charCode >= 65 && charCode <= 70 || charCode >= 97 && charCode <= 102;
const isPercentEncodedByte = (str, i, len)=>i + 2 < len && isHexDigit(str.charCodeAt(i + 1)) && isHexDigit(str.charCodeAt(i + 2));
const hexValue = (charCode)=>charCode <= 57 ? charCode - 48 : (charCode & 0xdf) - 55;
const isBase64Char = (charCode)=>charCode >= 65 && charCode <= 90 || // A-Z
    charCode >= 97 && charCode <= 122 || // a-z
    charCode >= 48 && charCode <= 57 || // 0-9
    charCode === 43 || // +
    charCode === 47 || // /
    charCode === 45 || // - (base64url)
    charCode === 95; // _ (base64url)
const isBase64Whitespace = (charCode)=>charCode === 9 || charCode === 10 || charCode === 12 || charCode === 13 || charCode === 32;
const base64Bytes = (significant)=>{
    const groups = Math.floor(significant / 4);
    const remainder = significant % 4;
    return groups * 3 + (remainder === 2 ? 1 : remainder === 3 ? 2 : 0);
};
// Buffer.byteLength(body, 'base64') uses the raw string length as an allocation
// upper bound even when Buffer.from later ignores characters or stops at '='.
const estimateBase64BufferAllocation = (body)=>{
    const len = body.length;
    let padding = 0;
    if (len > 0 && body.charCodeAt(len - 1) === 61 /* '=' */ ) {
        padding++;
        if (len > 1 && body.charCodeAt(len - 2) === 61 /* '=' */ ) padding++;
    }
    return Math.floor((len - padding) * 3 / 4);
};
const estimatePercentDecodedBase64BufferAllocation = (body)=>{
    // Ordinary Base64 needs only its length and trailing padding.
    if (body.indexOf('%') === -1) return estimateBase64BufferAllocation(body);
    let length = 0;
    let previous = 0;
    let last = 0;
    for(let i = 0, len = body.length; i < len; i++){
        let code = body.charCodeAt(i);
        if (code === 37 /* '%' */  && isPercentEncodedByte(body, i, len)) {
            code = hexValue(body.charCodeAt(i + 1)) * 16 + hexValue(body.charCodeAt(i + 2));
            i += 2;
        }
        length++;
        previous = last;
        last = code;
    }
    const padding = last === 61 ? previous === 61 ? 2 : 1 : 0;
    return Math.floor((length - padding) * 3 / 4);
};
const estimatePercentDecodedBase64Bytes = (body)=>{
    const len = body.length;
    let significant = 0;
    let padding = 0;
    let invalid = false;
    for(let i = 0; i < len; i++){
        let code = body.charCodeAt(i);
        if (code === 37 /* '%' */  && isPercentEncodedByte(body, i, len)) {
            code = hexValue(body.charCodeAt(i + 1)) * 16 + hexValue(body.charCodeAt(i + 2));
            i += 2;
        }
        if (isBase64Whitespace(code)) continue;
        if (code === 61 /* '=' */ ) {
            padding++;
            continue;
        }
        if (!isBase64Char(code) || padding > 0) {
            invalid = true;
            continue;
        }
        significant++;
    }
    // Fetch rejects malformed forgiving-base64 input. Returning the raw-size
    // allocation bound keeps that invalid input from becoming a pre-check bypass.
    if (invalid || padding > 2 || padding > 0 && (significant + padding) % 4 !== 0 || significant % 4 === 1) return estimateBase64BufferAllocation(body);
    return base64Bytes(significant);
};
const estimateDataURLBytes = (url, estimateBase64, base64Pattern)=>{
    if (!url || typeof url !== 'string') return 0;
    if (!/^data:/i.test(url)) return 0;
    const comma = url.indexOf(',');
    if (comma < 0) return 0;
    const meta = url.slice(5, comma);
    const body = url.slice(comma + 1);
    const isBase64 = base64Pattern.test(meta);
    if (isBase64) return estimateBase64(body);
    // Compute UTF-8 byte length directly from UTF-16 code units without allocating
    // a byte buffer (TextEncoder.encode would defeat the DoS guard on large bodies).
    // Valid %XX triplets count as one decoded byte; this matches the bytes that
    // decodeURIComponent(body) would produce before Buffer re-encodes the string.
    let bytes = 0;
    for(let i = 0, len = body.length; i < len; i++){
        const c = body.charCodeAt(i);
        if (c === 37 /* '%' */  && isPercentEncodedByte(body, i, len)) {
            bytes += 1;
            i += 2;
        } else if (c < 0x80) bytes += 1;
        else if (c < 0x800) bytes += 2;
        else if (c >= 0xd800 && c <= 0xdbff && i + 1 < len) {
            const next = body.charCodeAt(i + 1);
            if (next >= 0xdc00 && next <= 0xdfff) {
                bytes += 4;
                i++;
            } else bytes += 3;
        } else bytes += 3;
    }
    return bytes;
};
function estimateDataURLDecodedBytes(url) {
    // Fetch removes URL fragments before processing a data: URL.
    const fragmentIndex = typeof url === 'string' ? url.indexOf('#') : -1;
    return estimateDataURLBytes(fragmentIndex === -1 ? url : url.slice(0, fragmentIndex), estimatePercentDecodedBase64Bytes, /; *base64[\t\n\f\r ]*$/i);
}
function estimateDataURLBufferAllocation(url) {
    // Match fromDataURI's case-insensitive protocol and encoding suffix.
    return estimateDataURLBytes(url, estimatePercentDecodedBase64BufferAllocation, /;base64$/i);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"dtnmo":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "VERSION", ()=>VERSION);
const VERSION = "1.21.0";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"2qbsU":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _dataJs = require("../env/data.js");
var _axiosErrorJs = require("../core/AxiosError.js");
var _axiosErrorJsDefault = parcelHelpers.interopDefault(_axiosErrorJs);
'use strict';
const validators = {};
// eslint-disable-next-line func-names
[
    'object',
    'boolean',
    'number',
    'function',
    'string',
    'symbol'
].forEach((type, i)=>{
    validators[type] = function validator(thing) {
        return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
    };
});
const deprecatedWarnings = {};
/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */ validators.transitional = function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
        return '[Axios v' + (0, _dataJs.VERSION) + "] Transitional option '" + opt + "'" + desc + (message ? '. ' + message : '');
    }
    // eslint-disable-next-line func-names
    return (value, opt, opts)=>{
        if (validator === false) throw new (0, _axiosErrorJsDefault.default)(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')), (0, _axiosErrorJsDefault.default).ERR_DEPRECATED);
        if (version && !deprecatedWarnings[opt]) {
            deprecatedWarnings[opt] = true;
            // eslint-disable-next-line no-console
            console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
        }
        return validator ? validator(value, opt, opts) : true;
    };
};
validators.spelling = function spelling(correctSpelling) {
    return (value, opt)=>{
        // eslint-disable-next-line no-console
        console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
        return true;
    };
};
/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */ function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== 'object' || options === null) throw new (0, _axiosErrorJsDefault.default)('options must be an object', (0, _axiosErrorJsDefault.default).ERR_BAD_OPTION_VALUE);
    const keys = Object.keys(options);
    let i = keys.length;
    while(i-- > 0){
        const opt = keys[i];
        // Use hasOwnProperty so a polluted Object.prototype.<opt> cannot supply
        // a non-function validator and cause a TypeError.
        const validator = Object.prototype.hasOwnProperty.call(schema, opt) ? schema[opt] : undefined;
        if (validator) {
            const value = options[opt];
            const result = value === undefined || validator(value, opt, options);
            if (result !== true) throw new (0, _axiosErrorJsDefault.default)('option ' + opt + ' must be ' + result, (0, _axiosErrorJsDefault.default).ERR_BAD_OPTION_VALUE);
            continue;
        }
        if (allowUnknown !== true) throw new (0, _axiosErrorJsDefault.default)('Unknown option ' + opt, (0, _axiosErrorJsDefault.default).ERR_BAD_OPTION);
    }
}
exports.default = {
    assertOptions,
    validators
};

},{"../env/data.js":"dtnmo","../core/AxiosError.js":"1ZnKZ","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"29Czo":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _canceledErrorJs = require("./CanceledError.js");
var _canceledErrorJsDefault = parcelHelpers.interopDefault(_canceledErrorJs);
'use strict';
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */ class CancelToken {
    constructor(executor){
        if (typeof executor !== 'function') throw new TypeError('executor must be a function.');
        let resolvePromise;
        this.promise = new Promise(function promiseExecutor(resolve) {
            resolvePromise = resolve;
        });
        const token = this;
        // eslint-disable-next-line func-names
        this.promise.then((cancel)=>{
            if (!token._listeners) return;
            let i = token._listeners.length;
            while(i-- > 0)token._listeners[i](cancel);
            token._listeners = null;
        });
        // eslint-disable-next-line func-names
        this.promise.then = (onfulfilled)=>{
            let _resolve;
            // eslint-disable-next-line func-names
            const promise = new Promise((resolve)=>{
                token.subscribe(resolve);
                _resolve = resolve;
            }).then(onfulfilled);
            promise.cancel = function reject() {
                token.unsubscribe(_resolve);
            };
            return promise;
        };
        executor(function cancel(message, config, request) {
            if (token.reason) // Cancellation has already been requested
            return;
            token.reason = new (0, _canceledErrorJsDefault.default)(message, config, request);
            resolvePromise(token.reason);
        });
    }
    /**
   * Throws a `CanceledError` if cancellation has been requested.
   */ throwIfRequested() {
        if (this.reason) throw this.reason;
    }
    /**
   * Subscribe to the cancel signal
   */ subscribe(listener) {
        if (this.reason) {
            listener(this.reason);
            return;
        }
        if (this._listeners) this._listeners.push(listener);
        else this._listeners = [
            listener
        ];
    }
    /**
   * Unsubscribe from the cancel signal
   */ unsubscribe(listener) {
        if (!this._listeners) return;
        const index = this._listeners.indexOf(listener);
        if (index !== -1) this._listeners.splice(index, 1);
    }
    toAbortSignal() {
        const controller = new AbortController();
        const abort = (err)=>{
            controller.abort(err);
        };
        this.subscribe(abort);
        controller.signal.unsubscribe = ()=>this.unsubscribe(abort);
        return controller.signal;
    }
    /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */ static source() {
        let cancel;
        const token = new CancelToken(function executor(c) {
            cancel = c;
        });
        return {
            token,
            cancel
        };
    }
}
exports.default = CancelToken;

},{"./CanceledError.js":"4Mizl","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"kleuW":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>spread);
'use strict';
function spread(callback) {
    return function wrap(arr) {
        return callback.apply(null, arr);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"5VdvB":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>isAxiosError);
var _utilsJs = require("../utils.js");
var _utilsJsDefault = parcelHelpers.interopDefault(_utilsJs);
'use strict';
function isAxiosError(payload) {
    return (0, _utilsJsDefault.default).isObject(payload) && payload.isAxiosError === true;
}

},{"../utils.js":"3iykr","@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"fsxhN":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const HttpStatusCode = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    /**
   * @deprecated Use `ContentTooLarge` instead.
   */ PayloadTooLarge: 413,
    ContentTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    /**
   * @deprecated Use `UnprocessableContent` instead.
   */ UnprocessableEntity: 422,
    UnprocessableContent: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511,
    WebServerReturnsAnUnknownError: 520,
    WebServerIsDown: 521,
    ConnectionTimedOut: 522,
    OriginIsUnreachable: 523,
    TimeoutOccurred: 524,
    SslHandshakeFailed: 525,
    InvalidSslCertificate: 526
};
Object.entries(HttpStatusCode).forEach(([key, value])=>{
    if (HttpStatusCode[value] === undefined) HttpStatusCode[value] = key;
});
exports.default = HttpStatusCode;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"dT0jl":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "hideAlert", ()=>hideAlert);
parcelHelpers.export(exports, "showAlert", ()=>showAlert);
const hideAlert = ()=>{
    const alert = document.querySelector('.alert');
    if (alert) alert.parentElement.removeChild(alert);
};
const showAlert = (type, message)=>{
    hideAlert();
    const markup = `<div class='alert alert--${type}'>${message}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 5000);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}],"7WBWG":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "displayMap", ()=>displayMap);
const displayMap = (locations)=>{
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/alyonarogovaya/cmvnsmavr00un01pl3n0nbz5y',
        scrollZoom: false
    });
    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach((location)=>{
        const el = document.createElement('div');
        el.className = 'marker';
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        }).setLngLat(location.coordinates).addTo(map);
        new mapboxgl.Popup({
            offset: 30
        }).setLngLat(location.coordinates).setHTML(`<p>Day ${location.day}: ${location.description}</p>`).addTo(map);
        bounds.extend(location.coordinates);
    });
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
    map.on('style.load', ()=>{
        map.setFog({});
    });
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"23fNz"}]},["9GAIn"], "9GAIn", "parcelRequire11c7", {})

//# sourceMappingURL=index.js.map
