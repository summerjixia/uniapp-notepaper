(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue ) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!*****************************************************************!*\
  !*** C:/web_gz/proj/hybridApp--/uniapp/hello-uniapp/pages.json ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */
/*!******************************************************************!*\
  !*** C:/web_gz/proj/hybridApp--/uniapp/hello-uniapp/data/api.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */ 12));var _request = __webpack_require__(/*! ./request */ 15);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

//记录登录信息
var saveLoginInfo = function saveLoginInfo(param) {return (0, _request.post)("/saveLoginInfo", param);};

//菜单目录
//[{id: "1",name: "笔记",subMenu: [{ id: "1-1", name: "笔记1" },{ id: "1-2", name: "笔记2" }]},{id: "2",name: "废纸篓"},{id: "3",name: "欢迎"}],
var getMenu = function getMenu(param) {return (0, _request.get)("/queryCatalogue", param);};
//添加新目录
var saveMenu = function saveMenu(param) {return (0, _request.post)("/saveCatalogue", param);};
//更新目录
var updateMenu = function updateMenu(param) {return (0, _request.post)("/updateCatalogue", param);};
//删除目录
var deleteMenu = function deleteMenu(param) {return (0, _request.get)("/deleteCatalogue", param);};


//目录下包括子目录笔记
var getNotePaperByAll = function getNotePaperByAll(param) {return (0, _request.get)("/queryList", param);};
//某个子目录下的笔记
var getNotePaperById = function getNotePaperById(param) {return (0, _request.get)("/queryListById", param);};
//模糊搜索所有目录下的笔记
var getNotePaperByLike = function getNotePaperByLike(param) {return (0, _request.get)("/queryListByContentLike", param);};
//保存笔记
var saveNotePaper = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(param) {var result;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (0, _request.post)("/saveNoteList", param);case 2:result = _context.sent;console.log(result);case 4:case "end":return _context.stop();}}}, _callee);}));return function saveNotePaper(_x) {return _ref.apply(this, arguments);};}();
//更新笔记
var updateNotePaper = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(param) {var result;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (0, _request.post)("/updateNodeList", param);case 2:result = _context2.sent;console.log(result);case 4:case "end":return _context2.stop();}}}, _callee2);}));return function updateNotePaper(_x2) {return _ref2.apply(this, arguments);};}();
//更新是否为置顶
var updateTop = function updateTop(param) {return (0, _request.post)("/updateTop", param);};
//删除
var deleteNotePaper = function deleteNotePaper(param) {return (0, _request.get)("/deleteNodeList", param);};var _default =

{
  saveLoginInfo: saveLoginInfo,
  getMenu: getMenu,
  saveMenu: saveMenu,
  updateMenu: updateMenu,
  deleteMenu: deleteMenu,
  getNotePaperByAll: getNotePaperByAll,
  getNotePaperById: getNotePaperById,
  getNotePaperByLike: getNotePaperByLike,
  saveNotePaper: saveNotePaper,
  updateNotePaper: updateNotePaper,
  updateTop: updateTop,
  deleteNotePaper: deleteNotePaper };exports.default = _default;

/***/ }),
/* 12 */
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 13);

/***/ }),
/* 13 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 14);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 14 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 15 */
/*!**********************************************************************!*\
  !*** C:/web_gz/proj/hybridApp--/uniapp/hello-uniapp/data/request.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.post = exports.get = void 0;var baseURL = "http://114.67.125.226:8081";

var get = function get(url, param) {
  return uni.request({
    url: baseURL + '' + url,
    data: param });


};exports.get = get;

var post = function post(url, param) {
  return uni.request({
    url: baseURL + '' + url,
    method: "POST",
    data: param });

};exports.post = post;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/*!*****************************************************************************!*\
  !*** C:/web_gz/proj/hybridApp--/uniapp/hello-uniapp/static/svg/zhankai.png ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAYAAAD9yHLdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAA/JJREFUeNrt2aGKVV0UwPGz7yRHs2KwzAOozQcwis9gs0yyaRWzYBUHBBnwCSwaDAY1WBR8AouIQQS1nP2FhUEQP9Zd597NzPx+ZXPKnb3C7D/7nGkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAStroDXA89LnPfb5wIZ4uX57a1Kb27Vs8v33bWmut/fgxep8ADBbBOHOm9957f/Ik1nnuf/XlS6w3bozeNwCDRUCePetruXVr9P4B2LIIwNWr64VDSABOrDj4791bJiBCAkfZavQGOIp2dpb9vfv3hQTgmItvH9evL3sDcSMBOPbigF+tIiSvXwsJACkRkLNn46B//36zIbl9e/S8ACxMSAAoERIASoQEgBIhAaBESAAo2W5I7twZPS8ACxMSAEr+DMmHD0ICQIqQAFAiJACUCAkAJUICQImQAFAiJACUCAkAJUICQImQAFAiJACUCAkAJUICQImQAFAiJACUCAkAJUICQImQAFAiJACUCAkAJUICQImQAFAiJACUCAkAJUICQImQAFAiJACUCAkAJUICQImQAFAiJACUCAkAJUICQImQAFAiJACUREjOndtOSB48GD0vAAuLA/78+QjKx4+bDcnh4eh5AVjYdkNy7droeQFY2HZC8ubN6DkB2JA46Pf2IiTfvy8bkE+fRs/H0bIavQHg/8UBv7s79alP/eHDqU1taqdPL/tXvn4dPScAC/kdjrhxvHixmVdXv+3vj54XgKKthWPuc5/fvRs9LwBF271xvHwZ687O6LkBWFMc5KdObefGcXAQDyvfQAGOqj/D8fy5cADwT8IBQIpwAJAiHACkCAcAKcIBQIpwAJAiHACkCAcAKcIBQIpwAJAiHACkCAcAKcIBQIpwAJAiHACkCAcAKcIBQIpwAJAiHACkCAcAKcIBQIpwAJAiHACkCAcAKcIBQIpwAJAiHACkCAcAKcIBQIpwAJAiHACkCAcAKcIBQIpwAJAiHACkCAcAKcIBQIpwAJAiHACkCAcAa4kD/fBwY+Hovff+6JFwABwTcSO4eFE4AEiJg31/Xzjg5PIPynr61Kfe2rI/enAQ682brbXW2jyPHhOAhcUrrEuX3DgAWEsc/E+fCgcAKRGA3d1YHz+OdZ7/HoyfP2O9e1c44Ohb+B02J12EYW8vnq5cifXXr/hm8upVW7VVW33+PHqfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADDcfwO8ckogilpIAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTA1LTE0VDE2OjQ5OjA1KzA4OjAwhysNJwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wNS0xNFQxNjo0OTowNSswODowMPZ2tZsAAABLdEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL2hvbWUvYWRtaW4vaWNvbi1mb250L3RtcC9pY29uXzBwdTNnNXJqenBxOC96aGFua2FpLnN2Z6GssSQAAAAASUVORK5CYII="

/***/ }),
/* 21 */
/*!******************************************************************************!*\
  !*** C:/web_gz/proj/hybridApp--/uniapp/hello-uniapp/static/svg/zhankai2.png ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgEAYAAAAj6qa3AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAPFJREFUaN7t0TGOgmAYhGFDYTgGh+AAUBqOYCxpqLWwIkHBRE5gpy0NBQf45iYcBM1YEKuNhbrg6s7T0AA/7zCZiIiIiIjII9ChQxeGaNGinc1GP79EiXK1Qo0a9WLx7HucZx+kS5duGNKjR69pLLLIovl86HDLLbd8t6NPn/5+z4oVq+l06HN/SJkypeMYjcbjsb+ez6/+kbvhmWWWbTZmZmYkChQo1uvRw8ce4s+GDz3Ex4T/9hD9/dvtx4W/OsTXhD86xNeG3xsCMWLEpxMCBAgul1t4P8Ry+e7vHG2IPhhAggTJ4fDu7xIRERER+Weue3BKHFbel2cAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDYtMTdUMTk6MjU6MTgrMDg6MDB1MaHaAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTA2LTE3VDE5OjI1OjE4KzA4OjAwBGwZZgAAAEl0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25fNWpoM3dzbjdwNC96aGFua2FpLnN2Z8XBssoAAAAASUVORK5CYII="

/***/ }),
/* 22 */
/*!**************************************************************************!*\
  !*** C:/web_gz/proj/hybridApp--/uniapp/hello-uniapp/static/svg/biji.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgEAYAAAAj6qa3AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAktJREFUaN7tWT1LA0EU3BeEoETLVBYiKQyKYGkU7Oy0kahd/kAKu+APEAsbf4ABrURJpZZCChV7bQyiKeysDAG/IDsW4wYS78gZze4lZJrh3e2+3Zm9e3sfSvU4oKGhR0YAANjdJc/MuJ6XPQMAAOvraMDLCzmZHPB2bH6eUSZDHhuzPnNRoiSbFRERKZUCC9bQ0KOj7J/P82ixSD48JK+ukuPxugF0ZHOT0dYWuVol39woKCi8v1s3oi3hRnAiQV5cJK+tUcfGhkQkIpHn5/qK0wCtyUdHPB6LuRYWVDjnfX8PT3x8kGdnfyYAAOztkSuV3hS+vNwi0fk5G15duRZmTXhjwmLRsGuB1oR/I+JaWFDh3sXN4POTnE5z1zg56XoDOi08tAbYEh46A2wLNxj4a4L/RaHgKxwKCisrfIA5OwuakcYuLZmY/U9Pmxq42wU4bjTK6l2r/bWqe+f31xeSKyAeJ19ekstlrng+zxW7uOjUyM4NoMCnJ0YLC7bHD00RdIW+Aa4n4Bp9A37bgdtSqYRQIviXI4M2d4HtbfLEhN31aoW7u44bwEfQ/X3XUv8L/RrgegKu0S+C7fnWc0WwVuN7+NBQqw5dVwRFiZJolC9Xr6/Np79vgXKZPDnZLZ/FW4E6hocZTU2RHx9/NgQAzM2RtWbH4+NuNcIIp55Coa4LgNePEWk0IpdjZO5x82vs9paX0Nuba4G+ECVKBgcZTE+TYzHOO5fja/fOjq8BjUakUowyGSYYH3et73dGPDwwODhgzbq+9mv+BemgrYBo7GChAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTA2LTE3VDE4OjQwOjEzKzA4OjAwpDwtogAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wNi0xN1QxODo0MDoxMyswODowMNVhlR4AAABHdEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL2hvbWUvYWRtaW4vaWNvbi1mb250L3RtcC9pY29uX2hobDZ2b254bnV2L2Jpamkuc3Zn9ki/0QAAAABJRU5ErkJggg=="

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */
/*!*********************************************************************************!*\
  !*** C:/web_gz/proj/hybridApp--/uniapp/hello-uniapp/utils/addNotepaperMixin.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.canvasDirectives = exports.photoDirectives = exports.backMainDirective = void 0; // 优化：
// 1.图片取消
// 2.两张图片之间有输入框
// 3.正文从第二行开始
// 4.文字下划线
//5.涂鸦图片高清
//6.相同图片无法连续添加两次
//7.同步异步
//8.openMenu

var backMainDirective = {

  back: {
    bind: function bind(el, binding, vnode, oldVnode) {
      var notePaper = vnode.context.$route.params;
      if (!Object.keys(notePaper).length) {return;}
      vnode.context.title = notePaper.title;
      var subCom = vnode.context.constructor.super.extend({});
      subCom = new subCom({ template: "<div class=\"note_content\">".concat(notePaper.content, "</div>") }).$mount();
      el.appendChild(subCom.$el);
      el.childNodes.forEach(function (item, index) {
        if (index > 2) {
          if (item.tagName == "DIV") {
            item.childNodes.forEach(function (divItem) {
              divItem.setAttribute(vnode.context.$options._scopeId, "");
            });
          }
        }
      });

    },
    unbind: function unbind(el, binding, vnode, oldVnode) {
      if (vnode.context.title) {
        var arr = []; //元素集合
        var str = ""; //文字
        var img = {}; //图片存储
        var children = el.childNodes;
        children.forEach(function (item, index) {
          if (index > 2) {
            if (item.tagName === "DIV") {
              item.childNodes.forEach(function (divItem) {
                if (divItem.tagName == "IMG") {
                  if (divItem.src.indexOf("/pictures") === -1) {
                    var fileName = "".concat(new Date().getTime(), ".jpg");
                    arr.push("<img class='imgel' src='/pictures/".concat(fileName, "' />"));
                    img[fileName] = divItem.src;
                  } else {
                    arr.push("<img class='imgel' src='".concat(divItem.src, "' />"));
                  }
                } else if (divItem.tagName == "TEXTAREA") {
                  arr.push("<textarea v-textEvent  style='height:".concat(divItem.style.height, "' class='textarea' rows='1'>").concat(divItem.value, "</textarea>"));
                  str += divItem.value;
                }
              });

            } else {
              if (item.tagName == "IMG") {
                if (item.src.indexOf("/pictures") === -1) {
                  var fileName = "".concat(new Date().getTime(), ".jpg");
                  arr.push("<img class='imgel' src='/pictures/".concat(fileName, "' />"));
                  img[fileName] = item.src;
                } else {
                  arr.push("<img class='imgel' src='".concat(item.src, "' />"));
                }
              } else if (item.tagName == "TEXTAREA") {
                arr.push("<textarea v-textEvent  style='height:".concat(item.style.height, "' class='textarea' rows='1'>").concat(item.value, "</textarea>"));
                str += item.value;
              }
            }
          }
        });

        if (!Object.keys(vnode.context.params).length) {
          // await saveNotePaper({
          //     catalogueId: vnode.context.openMenu.catalogueId,
          //     noteDate: new Date(),
          //     isTop: 0,//数据库应该设置默认值
          //     title: vnode.context.title,
          //     content: arr.join(""),
          //     words: str,
          //     picture: JSON.stringify(img)
          // })
          var xhr = new XMLHttpRequest();
          xhr.open('POST', 'http://114.67.125.226:8081/saveNoteList', false);
          xhr.onload = function (e) {};
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify({
            catalogueId: vnode.context.openMenu.catalogueId,
            noteDate: new Date(),
            isTop: 0, //数据库应该设置默认值
            title: vnode.context.title,
            content: arr.join(""),
            words: str,
            picture: JSON.stringify(img) }));

        } else {
          // await updateNotePaper({
          //     listId: vnode.context.params.listId,
          //     catalogueId: vnode.context.openMenu.catalogueId,
          //     title: vnode.context.title,
          //     content: arr.join(""),
          //     words: str,
          //     picture: JSON.stringify(img)
          // })
          var _xhr = new XMLHttpRequest();
          _xhr.open('POST', 'http://114.67.125.226:8081/updateNodeList', false);
          _xhr.onload = function (e) {};
          _xhr.setRequestHeader('Content-Type', 'application/json');
          _xhr.send(JSON.stringify({
            listId: vnode.context.params.listId,
            catalogueId: vnode.context.openMenu.catalogueId,
            noteDate: new Date(),
            title: vnode.context.title,
            content: arr.join(""),
            words: str,
            picture: JSON.stringify(img) }));

        }

      }

    } } };exports.backMainDirective = backMainDirective;




var photoDirectives = {
  image: function image(el, binding, vnode, oldVnode) {
    var reader = new window.FileReader();
    el.addEventListener("change", function () {
      reader.readAsDataURL(el.files[0]);
      reader.onload = function (e) {
        var imgEl = document.createElement("img");
        imgEl.setAttribute("class", "imgel");
        imgEl.setAttribute(vnode.context.$options._scopeId, "");
        imgEl.src = this.result;
        window.$el.after(imgEl);

        //创建新的textarea
        var subCom = vnode.context.constructor.super.extend({});
        subCom = new subCom({ template: "<textarea class=\"textarea\" v-textEvent  ".concat(vnode.context.$options._scopeId, " rows='1'></textarea>") }).$mount();
        imgEl.after(subCom.$el);
        subCom.$el.focus();
      };

    });
  } };exports.photoDirectives = photoDirectives;



function direc(el, binding, vnode, oldVnode) {
  var ctx = el.getContext("2d");
  var startPosition = {};
  el.addEventListener("touchstart", function (e) {
    var touch = e.targetTouches[0];
    vnode.context.canvasheight = { min: Math.ceil(touch.clientY), max: Math.ceil(touch.clientY) };
    startPosition.x = Math.ceil(touch.clientX);
    startPosition.y = Math.ceil(touch.clientY);
  });
  el.addEventListener("touchmove", function (e) {
    var touch = e.targetTouches[0];
    if (vnode.context.penSize === 2) {
      ctx.beginPath();
      ctx.arc(
      Math.ceil(touch.clientX),
      Math.ceil(touch.clientY),
      15,
      0,
      Math.PI,
      false);
      //圆心坐标xy、半径长度、起始结束弧度、顺时针逆时针
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.closePath();
      return;
    }

    var h = vnode.context.canvasheight;
    if (touch.clientY < h.min) {
      h.min = touch.clientY;
    } else if (touch.clientY > h.max) {
      h.max = touch.clientY;
    }

    ctx.beginPath();
    if (vnode.context.penSize === 0) {
      ctx.lineWidth = 1;
    } else {
      ctx.lineWidth = 5;
    }
    ctx.strokeStyle = vnode.context.colorpen;
    ctx.lineJoin = "round";
    ctx.moveTo(startPosition.x, startPosition.y);
    if (vnode.context.penSize === 0) {
      ctx.lineTo(Math.ceil(touch.clientX), Math.ceil(touch.clientY));
    } else if (vnode.context.penSize === 1) {
      ctx.lineTo(Math.ceil(touch.clientX), Math.ceil(touch.clientY));
    }
    ctx.closePath();
    ctx.stroke();

    startPosition.x = Math.ceil(touch.clientX);
    startPosition.y = Math.ceil(touch.clientY);
  });
}

var canvasDirectives = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    direc(el, binding, vnode, oldVnode);
  },
  updated: function updated(el, binding, vnode, oldVnode) {
    console.log("updated");
    direc(el, binding, vnode, oldVnode);
  },
  componentUpdated: function componentUpdated(el, binding, vnode, oldVnode) {
    console.log("componentUpdated");
    direc(el, binding, vnode, oldVnode);
  },
  unbind: function unbind(el, binding, vnode, oldVnode) {
    var h = vnode.context.canvasheight;
    if (!h) {
      return;
    }
    var imgEl = document.createElement("img");
    imgEl.setAttribute("class", "imgel");
    imgEl.setAttribute(vnode.context.$options._scopeId, "");
    imgEl.setAttribute(
    "style",
    // " width: 300px;" +
    // "height:" +
    // (h.max - h.min + 20) +
    "background-color: rgba(245,245,245,.5);");

    imgEl.src = el.toDataURL("img/jpeg");
    window.$el.after(imgEl);
    //添加新textarea
    var subCom = vnode.context.constructor.super.extend({});
    subCom = new subCom({ template: " <textarea v-textEvent ".concat(vnode.context.$parent.$options._scopeId, " class='textarea' rows='1'></textarea>") }).$mount();
    imgEl.after(subCom.$el);
    subCom.$el.focus();
  } };exports.canvasDirectives = canvasDirectives;

/***/ }),
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */
/*!*****************************************************************************!*\
  !*** C:/web_gz/proj/hybridApp--/uniapp/hello-uniapp/static/svg/xiangji.png ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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OTqHVVgBAB6ZlRw3hRcIO8gOsoN37ojOAQBQVyhL4ty6JTqH+AL5nH3OPr98WXQOAIC6gs1lc9lc8cdN4QUinZPOSefOnaMyKqMy8UMyAACr1Zf6Ul+j0Wmz02anzYWFouMIXwvLQtNc01zT/Phx6kydqXOnTqLzAABYnd20m3YfO6a/o7+jvxMQIDqO8BHIfcEUTMGZmaJjAABYrQAKoADrOU5aTYFIyVKylLxhA2lIQxrORecBALAa946L/GX+Mn9540bRcSyspkBSK1MrUyvPnaOf6Cf6aft20XkAAKxGKIVSaFqaYYFhgWGB+GsfFlZTIPeNoTE0JiEBF9UBwO5ZjoPH6BgdmzFDdJwHWV2B6D30HnqPrCw+ko/kI5ctE50HAEAU3o/34/2WLNGH6cP0YTk5ovM8yOoKxMIh1SHVIXXKFD6Xz+Vzc3NF5wEAqDUDaSANPHXKJc4lziVu6lTRcR7GagskJSUlJSXl7l0pToqT4vr35x/wD/gHP/0kOhcAQE1RPjBfusTusDvsjlqdxJJYEisvF53rYay2QCx0O3U7dTt/+cVsMpvMpr596TSdptM//ig6FwBAtXmZXqaXL15UHvTsqYvVxepirf84Z/UFYpEemB6YHlhQQEfpKB0NCCCZZJIPHBCdCwDgicVRHMXt3y//U/6n/M+AAIOPwcfgc/as6FiPqs4UiIVykf3yZZlkkqlXL2XI9/775EVe5FVWJjofAMBDTaWpNPXWLXaX3WV34+LkJfISeUnv3sop+ytXRMd7XFazlMnTioqMioyK9PComl01u2r2xInsA/YB+2DkSGWk0rSp6HwAYIcG0SAadPUqnaSTdPLvf6+Kroquiv7yy4yOGR0zOhYXi473tGymQB4UxIN4EJflJvFN4pvE9+zJfJkv8+3dmzbSRtro70/X6Tpd9/amYiqm4saNyZ/8yd/JSXRuAKgDTtJJOnn7Nk2kiTSxtJRaUStqdfYsm8PmsDknT/KxfCwfu2fP9eHXh18fvm/fAXaAHWBGo+jYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgwP8BitdZ0rxRTJUAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDUtMTRUMjE6NTk6NDUrMDg6MDDD/f+eAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTA1LTE0VDIxOjU5OjQ1KzA4OjAwsqBHIgAAAEp0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25fOHpnNzViNzl1NHQveGlhbmdqaS5zdmeJ0fJkAAAAAElFTkSuQmCC"

/***/ }),
/* 63 */
/*!**************************************************************************!*\
  !*** C:/web_gz/proj/hybridApp--/uniapp/hello-uniapp/static/svg/tuya.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 64 */
/*!**********************************************************************************!*\
  !*** C:/web_gz/proj/hybridApp--/uniapp/hello-uniapp/static/svg/shuangyinhao.png ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAYAAAD9yHLdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAKP1JREFUeNrt3XlcVNXfB/DvmQUhJRFEf2oqhmm4ABmZCyUakv7YZkAETSLlp7mgpWK5C+KSSloqSYgWrunA3BlAcUPQNC2XgBKMJJcwE0JMXFhm7nn+uIzPU8/Tk+bMnDsz3/c/v1f+ejGf4dXxc8+9554DgBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEELJJhHUAaxNyIuREyAlHR9ky2TLZst69oRN0gk5du/If8x/zH3fpArmQC7mdO5NPyCfkE1dXcAZncJZKaTyNp/Ft2vz555FkkkySa2vJWXKWnL13j9/B7+B33L9PKKGEXrvG+/F+vN8PP5CL5CK5WFrabm27te3WXr6ctjltc9rmpibWvw+E/jdCFGWKMkXZc89JvaReUq/u3Xkf3of36dKFVJNqUt2lCzyAB/CgQwfqQ32oT8uW4AM+4OPgQP2oH/Wzt3/4owbBIBh0/z7xI37E7/59OApH4eidO8SDeBCPmhp9ub5cX15eTlJJKkktLZXny/Pl+T/8oMpUZaoyf/+d9W/C0mGBPKbgm8E3g2+2by/1k/pJ/YKCJHWSOkmdry9/hj/Dn3npJWgJLaGlhweJITEkRiIxdz66kW6kG5uayDqyjqw7exbWwBpYc+gQvUgv0osHD8oXyxfLF3/zjUqlUqlUej3r3yeyLhEREREREVKprlZXq6v19aUb6Aa6ISCAXCKXyKWXX4ZoiIZoHx8YCkNhaOvWzIKuhbWw9vJl6AydofPhw8SLeBGvAwekHlIPqcfRo1gwjwYL5C8EnQ06G3S2bVtZS1lLWcs33yR2xI7YhYdTV+pKXQcMYFUQT2wGzIAZtbXQETpCx507+Vg+lo/dtEl7QntCe6K0lHU8ZFnCcsNyw3KHDqUhNISGREeDFrSgDQ6GrbAVtrZtyzrfYwuAAAjQ6WAezIN5Bw/SVJpKU1NSvCK9Ir0iDx5MJIkkkfA865higQXSTKFQKBSKF1+UnJWclZyNi+MP84f5w1FRZD6ZT+b/jymztZoJM2FmYSH4gR/4ffQRx3M8x2u1rGMhcRBmFg4OTU1NTU1N0dFkHBlHxsXFwU7YCTv79mWdz+TcwR3cKyqEC6+UFNkp2SnZqdRUYSb/4AHreKzYbIGEbQzbGLaxa1deykt5aVISaUlakpbjxgEHHHDEZn8vD6VBGqR9/TWJJtEk+t131QfUB9QHTp9mHQuZEyFKhVKhVIwaBetgHaxbtQpmwSyY1a0b62TMXYWrcLWyEhIhERIXLOCCuWAuePt24f+klHU8c7GZvyiFW1JPPSU7LjsuO758OURCJEROm0biSByJk8tZ5xMrmkEzaAbPSzpKOko6fvaZvk5fp6+Lj9cSLdGS27dZ50PGFR4VHhUe1bs3v4HfwG/YsgUmwSSY9PLLrHOJnXCr6/hxMowMI8MmT+YucBe4C2VlrHOZmpR1AFNTbFJsUmzq31/qKnWVuh44QHaT3WR3UBDZT/aT/VKr//5PimiIhmgIEabw/fpBV+gKXceO7XW91/Ve10+fLrtUdqnsUmUl65zoyShzlDnKnDffpE20iTZptZAO6ZCOM41HRXJJLsnt2hVqoAZqJkzwsPOw87CrqrpYd7HuYt3586zzmex7sw5gKkonpZPSae5cWAkrYWVSEhyCQ3BIJmOdy2rcgBtwo7ERfMEXfOfM4ZK5ZC55/XrWsdCjMTzT0DnqHHWOO3ZALdRCbVgY61zWhpwhZ8iZzz9v1DRqGjXTpuX65Prk+ty/zzqX0b4f6wDGEjEqYlTEKDs7/Wn9af3pTz+lL9GX6EtvvcU6l81wB3dw37zZc43nGs81kyfjahVxCgwMDAwMbNPGbrndcrvlWq1wD/+VV1jnsnp+4Ad+5841DW4a3DR4xAihSH77jXWsJ2Xxt3AMzzZIP9KP9MvLg2twDa4pFKxz2ZxaqIXaF1+siq+Kr4rv2rXP631e7/N6bm5paWlpaantPFQUK+EF144dZW/J3pK9VVBA3iPvkfd8fFjnshlX4Apc6dhR2kXaRdpl5Mi+tC/tSzlOGB9377KO909Z3nsMzSZNnDRx0kS5XFYiK5GVqFTCKhE/P9a5bJ1h5qebpJukm7R9+xA6hA6heOuQldBZobNCZ3XuLB0mHSYdVlhIppKpZGrv3qxz2azmZc86rU6r0x4/Ltw56dKFdax/ykJnIIR0ud7lepfrW7eSB+QBeTBqFOtE6E/OwBk407evw3aH7Q7bXVwu/njxx4s/7t/POpatCKWhNJS6uUl6SnpKehYWwmW4DJfd3VnnQs16QA/o4eKi36nfqd85cqR7kXuRe9GuXT/++OOPP/5YX8863qOyuGcgYSPCRoSNePdd6kAdqMO6dazzoEdDKaWUvv22RqPRaDRpaazzWCvDXmwSd4m7xP3UKZxxWAbDMuCGwQ2DGwYHBORdyruUd6mhgXWuv2Mxt7BCd4TuCN3Rty+/jl/Hr1u5knUe9JhSIAVSNm5U+iv9lf5DhrCOY22W0CV0CZVIpIXSQmnhrl1YHJaFTCaTyeRXX3Wod6h3qE9NZZ3nUYm+QEZ2H9l9ZPcWLSTPSp6VPKtS2czWIlbm4QubsRALsXv2KKuV1crqDh1Y57IWxfnF+cX5CQlwDs7BuaAg1nnQP2N4hqg4oDigOPDOO6zz/B3RF4i91l5rr509W9hVtmdP1nnQE9oLe2Fv+/ZQBmVQtmuXYfdW1rEsVfj88Pnh8z09wQM8wGPuXNZ5kHGQ78n35PtVqwx3Xljn+SuiLRDhL5ZOnWAkjISR8+axzoOMrHnVnG6qbqpuanw86ziWxlC8+sH6wfrBW7bgljxW5iSchJMtWpBnybPk2YwMw3turGP9mWgLRNdS11LXcuFCeBFehBdbtWKdB5kG7UF70B5JScLiiAEDWOexFLpPdJ/oPhk/nqSTdJKO73NYK7KGrCFrXnhBX6Av0BcsWsQ6z5+JrkCEKytnZ5gDc2BOdDTrPMi0DFfOdCadSWdu2WJ4v4d1LrF6eMuvE3SCTu+9xzoPMg+6jC6jy+bODfUN9Q317dWLdR4D0RWIcJJZXBwshIWwsGVL1nmQmaRCKqT26lXtUe1R7REXxzqOWOmH6Ifoh4wdC4EQCIHPPcc6DzKT5r38JPmSfEn+Bx+wjmMgsgIhhCbRJJoUG8s6CWLEF3zBNyFBuNL+179YxxEbGkkjaeS0aaxzIEaiIAqigoMVvgpfhe9rr7GOI5oCCXULdQt169+frCaryWrLfbUfPaGVsBJWPv20zl/nr/MXz5UWayEDQgaEDOjeHfIgD/L692edB7FFeMIT/sMPDe//sMohmgKRbJBskGwYPZp1DiQOdAwdQ8dERyvKFGWKsh49WOdhTdpK2kraauxYPDETAQBAe2gP7b28iqAIiiAkhFUM0RQI2IEd2I0YwToGEgcSQ2JIjEQC7aAdtJszh3Ue1oRFBsHBrHMgcZFMlEyUTJw9m9nns/4FCJu+OTnRgXQgHfj886zzIJGph3qoj4mx9F1L/6nhxcOLhxe3bEmukWvkmrc36zxIZGqgBmp8fVktg2deILIWshayFoMGPbziROh/MCzzbXJrcmtymzGDdR5zcySOxJEMHIgnaqL/D7Wn9tR+1ixzfy7zv7D1i/SL9Iv69WOdA4kbqSN1pC42NobG0BhqO3uh0Vfpq/RVfFEQ/Y3X4XV4XalUxivjlfHt2pnrY5kXCFlClpAlzz7LOgcSuSqogionpzvKO8o7Stt5FkAraAWtwHM80N8wzFAroRIqIyLM9bHMCwQKoRAKu3VjHQNZiD2wB/bYzg4FJJJEkki8wEKPaDksh+Vjx5rr49gXSGfoDJ27dmUdA1kG+hv9jf42YoTwUN3VlXUekyuGYih2c2MdA1mIk3ASTg4cGFYSVhJWYvoLD/YF4g7u4N66NesYyDL88aG6DRxlXAM1UOPkxDoGshDN7wnRGlpDa0x/K4t9gayG1bAa97xCj4e8T94n7wcEsM5hcjg+0D9A5VRO5f7+pv4cZgXycFfR5n3vWeVAFuoyXIbLw4ZZ6+69OD7QE3EBF3Dx9RX+O3JwMNXHMCuQu9/e/fbut7iuHf1DzXtm3XS86XjT8aWXWMcxNhwf6EkYjv7WddV11XUdONBUn8OsQPIu5V3Ku9TQAHVQB3V6PascyLJJSiQlkhLTT9XNDccHMp5hw0z1k9k/A/EGb/C+f591DGSZaAJNoAmvvMI6h8ng+EBP4ipchau+vqb68cwLhM6is+ise/dY50AWyhu8wdvLi3UMU8HxgZ7IVJgKUz09TfXjmRcIGU6Gk+G//MI6B7JMJJpEk2hXV2W1slpZ3aED6zxG/344PtCTWA/rYX2bNqGzQmeFzurc2dg/nnmB0EyaSTN/+ol1DmThfoQf4UcrnIloQAOay5dZx0CWTTJPMk8yz/gzEeYFInlL8pbkLSwQ9IQaoAEarLBA+kJf6IsFgp4MnU/n0/lWWCAQDdEQ/f33rGMgyybcyrK+82Tot/Rb+i2OD/RkJHmSPEme8U/2ZF4gTbSJNtETJ1jnQJaNtqftaftOnVjnMDZ+PD+eH3/yJOscyLKZanwwL5Cc6TnTc6ZfviwsN6usZJ0HWagVsAJWWF+BZJ/OPp19+tIlmkJTaMqvv7LOgyyUicYH8wIxIFWkilQdOcI6B7JQalCDumNH1jFMhVwgF8iFggLWOZCFioRIiLTiAhG2rf7iC9YxkIVqPnBK2Oa9VSvWcYyN9+f9ef+9e1nnQBZqKAyFoa1bG3t8iKZAapxrnGuc8/NhNIyG0Tdvss6DLJN+sX6xfrH5jvQ0FydwAic4cADmwTyYd+cO6zzIMhl7fIimQI6RY+QY0enIR+Qj8lFGBus8yDLRbXQb3fbUU6xzGFsGySAZpL6eOlJH6rh7N+s8yDIZe3yIpkAMmrKbspuy166FciiH8gcPWOdBlkXiK/GV+Nrbs85hsu/XJGmSNK1ejZsson/C2ONDdAWS0z6nfU77mzfBDdzAbetW1nmQZdG10rXStTLd+QesqT3VnmrPn36CTbAJNmk0rPMgy2Ls8SG6Ann4Rbfqtuq2JiXBDJgBM2prWedBlkHys+Rnyc/WOwMxEN4PWbyYbqQb6camJtZ5kGUw9vgQbYE8nImMg3Ew7v33WedBFiIWYiHW+p6B/Jn2hPaE9kRpKayDdbBu/XrWeZCFMPL4EG2BGHDXuevc9fR0kIEMZMeOsc6DxI08RZ4iT1HKOoe58ApewSsSE/FFXPQojD0+RF8gAkplIAMZREXRFXQFXXH9OutESJz4dD6dT7edWzrZvtm+2b51dWQCmUAmvPEGBEAABOh0rHMhcTL2+LCQAgFQqVQqlcqwlUNEBNyAG3CjsZF1LiQyG2EjbLS9/y7Uceo4ddzx48L3T0hgnQeJlJHHh8UUiIHGQ+Oh8Th1ChbAAlgwcSLNoBk0g+dZ50LiQOyJPbG33Stwz+89v/f8fuVKYaaemck6DxIXY48PiysQAy6YC+aCt20jP5GfyE//+Q8WCQIAkMRJ4iRxtnsEbCJJJImE5+WL5Ivki954A8IhHMIPHWKdC4mDsceHxRaIAefNeXPen30GS2EpLI2LwyKxbfqe+p76nrjVhypTlanKbGzUu+nd9G6jRkEapEHa11+zzoXYMvb4sPgCMdAka5I1yZs2SVZLVktWR0fj+njbpHfWO+udf/+ddQ6xMDxkv/vL3V/u/vLaa/AavAav5eWxzoXYMPb4sJoCMVAvUy9TL9u1S9pN2k3aTaGAc3AOzt29yzoXMg/7OPs4+zicgfzZYa/DXoe97t2TFcoKZYUKhbBV0M6drHMh8zL2+CCsv5CphZwIORFyomdP6XLpcunyzEywB3uw79OHdS5kZM0XCtw17hp3zdGRdRxLoVAoFArFpEnkV/Ir+XXDBugAHaCDnR3rXMjIlsEyWHbvHteb6831tsLt3E1FmML/8IOspaylrOXAgXjlZaX2wT7Yhyf2PS6NRqPRaNLSSCWpJJW+vsKzxEuXWOdCRsYDD/yNG8b+sVZfIAbCQ8W7d7kL3AXuwrhxkn2SfZJ9gYHwHXwH3129yjofejK0HW1H2/3yC+sclkpdqa5UV54547redb3r+l69hD3o5s4VlgPX17POh56QHvSgxwIxmqzGrMasxv37Zd4yb5l3nz50Gp1GpyUl4YE9lon8TH4mP+MM5EmlbU7bnLa5qYkbyg3lhq5aJfyplxdMhakwdfdu3EbeQiVAAiQYf3zYbIEYGGYmGn+Nv8Z/8WLZGtka2Zpu3cAd3MF9+XKYABNgwm+/sc6J/oYv+ILvtWusY1gb4cXd8nJuODecGz52rD5Bn6BP6N2bnCFnyJnPP8dzeywD7U670+7GHx82XyB/JmyZcusWl8wlc8kLF8oyZBmyjE6dhIESHg5fwBfwRU6O6AaOO7iDe0WFcIV49CjrOGbXD/pBv4oK1jGsneGZonDLa/z4+ob6hvqGf/2L7qF76J7YWOGWV0GB6JbR2/r4AAAA448Pq1+FZSoxNIbGUHv7O3PuzLkzZ9Ag4U+HDaO9aC/a64UXSCkpJaU9e0IRFEGRmxs4giM4SqWP/UHtoB20u30bekEv6FVRIbwQdvEi+Z38Tn7/6isaRaNo1PHjQuF9/32YLEwWJnv7bRpMg2lwairr35PZhEAIhAQEcOO58dz4w4dZx7F1EaMiRkWMatWqaVTTqKZRr7wiWSdZJ1nn50eraTWt9vQU/iLv0YNW0Apa4eZGYkgMiZE8/gUtjo9HQtJJOkkfMULtonZRuxw8aLSfy/qLWbuR3Ud2H9m9RYtWL7R6odULbds2vNPwTsM7rVpJkiXJkuRWreB1eB1el0qFs64fPJB6Sj2lnvfuSZdKl0qX1tQIt9ge/cUfRZmiTFE2axaZT+aT+R9+yPr7mwtJJIkk0d394Yl9yCLg+DAP/Q39Df2N557LPp19Ovu08VbZYYFYGaW/0l/pv3ixMONJTGSdx+S8wAu87t/3XOK5xHOJo6NhLyjWsZA42dz4aL7VLusl6yXr5ego3KI33iIIfAZiZag39abeTz/NOofZbIbNsPnCBSwO9ChsbnxMgkkwqbTU2MVhgAViZcjb5G3ytpsb6xxmMwbGwJiiItYxkGWwufFxH+7D/eJiU/14LBBrowAFKLp1Yx3DXEgBKSAF333HOgeyEPthP+y3nQIhx8gxcsx04wMLxNr4gi/4Pvss6xjmoq/R1+hrvvmGdQ5kIWbCTJhpOxdY8Dw8D8+fOWOqH48FYiWU8cp4ZXy7dlAFVVDl5MQ6j6kZttholDXKGmV4Cwv9/4TVVy4uEAqhEOrszDqPqRnew5Fel16XXj9/3lSfgwViJUgqSSWpAwawzmG272tH7Ijd+fN5l/Iu5V1qaGCdB4kbaUvakrY2ND62kC1ky7ffCg/PTffCMxaItegAHaCD7QwQuoluoptOnWKdA1mImTATZvbvzzqGudAetAftYfoTKLFArATdQrfQLQMHss5hNj7gAz75+axjIAtRBmVQZjvjg0bSSBpp+i1bsEAsXNDZoLNBZ596Co7CUThqA1dYN+AG3GhslGfKM+WZX37JOg4SN2FLFTs7GApDYagNzND/sFtyYaGpPw4LxMLZxdjF2MW8/joUQzEUP/UU6zwm1xk6Q+dTpwy7KLOOg8RNN0s3Szdr2DCogAqosIGTKl+FV+HVc+e0REu05PZtU38cFoiFozPoDDojNJR1DrNJgARIOHSIdQxkGWgjbaSNwcGsc5jNHbgDd8y3mSgWiIUaQofQIVQmg47QEToGBrLOYy6SJEmSJEmrZZ0DWQJCyCwyi8wKCWGdxGzf+AvyBfnCfONDxvoLo3/GxdHF0cXx3/+mw+lwOrxtW9Z5TK75rO6svll9s/peuMA6DhK3sI1hG8M2vvIKzaf5NP+ZZ1jnMblaqIXaGzeEc1rOnjXXx+IMxELRVJpKU6dNY53DbM7CWTjLcaxjIMtAe9KetOfkyaxzmO37bqKb6Kbs7OZ/oub6XCwQCxNuF24Xbvfcc8ADD/zw4azzmAufyCfyiVlZrHMgcRNWJbZtKywqCQtjncdcyGlympw2//jAW1gWhu/Id+Q7TpkCHHDAEes/z8UVXMG1vFx7RXtFe8X0L0Yhy2b3sd3Hdh/HxNC79C6926IF6zwm13zrSrZftl+23/xH9eIMxEI8vLIaBaNg1H/+wzqPudDOtDPtvH076xxI3Azve9BT9BQ9NX066zxmcwWuwJUvvjDVeR9/BwvEQshvyG/Ib8ybZzPr2ZWgBCWleie9k95p507WcZC46X7R/aL7ZcIE6At9oW/XrqzzmItwQBa78YEFInLKamW1srpDBzgH5+CcDT0UbE1b09aHDuVMz5meM/3yZdZ5kDhNmjhp4qSJcrlwdvr777POYzY34SbcLC7WaDQajebcOVYxsEAswqJFNvOmeTMaQkNoSGoq6xxI3H777LfPfvtswgQogiIosp2DogTsxwc+RBcpZY4yR5nj5QWZkAmZEyeyzmM2V+EqXK2svA234Tbk5rKOg8RpZPeR3Ud2f/pp+gx9hj6zZAnrPGZzDs7Bubt36+3q7ertdu1iHQdnICITEREREREhlVIJlVBJejocgkNwSGY7Rb8dtsP2TZuOkWPkGNHpWMdB4mTvbO9s75yUBG2gDbTp0IF1HrMZBsNg2I4dwjk4d+6wjoMFIjK6rrquuq7TppF0kk7SfXxY5zGbZbAMlt27JxTnp5+yjoPEKTwqPCo8qndvylGOclOmsM5jLjSDZtAMnpeUSEokJR9/zDqPARaISAjLELt0gdEwGkYnJbHOY3aBEAiBaWkaD42HxqOmhnUcJC5L6BK6hEok/Fx+Lj930yYSR+JInFzOOpe5kKVkKVmak5N1Put81vmLF1nnMcACYcywKaLOSeekc9q5E1bCSlj59NOsc5mL4exmPowP48PWrWOdB4lT8cXii8UX330XEiEREl95hXUes0uHdEhPTmYd48+s/01mkVOOU45TjktMhHtwD+4tXsw6j9m1htbQOjWV+5z7nPvcdm5JoEej7K3srezt4SH807lz0AN6QA8HB9a5zIWuoCvoioICYWY+bBjrPH+GMxBGQo+EHgk98sor8Cv8Cr8uWMA6j7kJA6O+nnfmnXnnFStY50Hi8vC4gttwG25nZNhacRiQ6WQ6mZ6YyDrHX7Gd1T0iEXIi5ETIiY4diQtxIS67d4MjOIKjVMo6l7mRWlJLaj/9VLNWs1az9uefWedB4uLczbmbc7fVq6E/9If+L73EOo/Z1UEd1B09yh3hjnBHjh1jHeevYIGYyfDi4cXDi1u2lI6VjpWOzckRrqg6dWKdy+zmwTyYd+cO7IW9sBdnHuiPFJsUmxSb4uKE5eszZ7LOY3bNW/jwRXwRX7RoERyBI3CEdai/hrewTMyweqRVx1YdW3XcsUMojn79WOdipgIqoCIpiUvmkrnkqirWcZA4CFv2BAaSLJJFsj76iHUeZnpBL+ilUmnXatdq1371Fes4fwdnICZWcqrkVMmptWthDayBNQoF6zzMNJ8oWK+sV9YrN2xgHQeJQ6hbqFuo28svQwqkQMrevbZ6SxcGw2AY3NBA7IgdsZs3j3WcR4WrsEwkzCXMJcwlKYm+Sl+lry5cyDoPc1rQglah4HiO53g809zWhWvCNeEaHx8+j8/j8w4fhiqogionJ9a5mMmDPMhLTubquXqufs4c1nEeFd7CMjLDslwsjmYFUAAF+/ZhcSAAw62qfv2E934OHrT54jAcCBUkC5IFLVvGOs7jsr2pookIA2PRIlCDGtQJCazzMOcO7uBeVydMyUeOLLtUdqlMBHv3IDbCngl7JuyZl16CSqiEyiNHoDN0hs5t2rDOxZw92IN9bGyWOkudpT5/nnWcx4UF8g8ZHo63udfmXpt7a9aQbWQb2WZ773P8JWdwBuf33uO2cdu4bYcPs46D2FB+pfxK+dWIESAFKUhzc4UCad2adS7miqEYig8c4E5xp7hT8+ezjvNP4S2sxyRsI92iRcmQkiElQ3buJBWkglTMns06l1jQPXQP3XPypOyq7KrsakoK6zyIDUWjolHROGEC7Uq70q7Z2TZzkubfMWwaGkbDaFhcHOs4TwpXYT0iRZmiTFHm4iLcmtFqIRIiIXLwYNa5RKP5/Q79p/pP9Z9GR2tUGpWGwRnNiCVClKuVq5WrV6wQxsfcuawTiQ3xIl7Ea/ZsTsfpOF1FBes8TwoL5G8YHvrBKlgFq/buFa6k3N1Z5xIdO7ADu3ffxSNobcvDC6tTcApObdsGOZADOf/+N+tcojMBJsCE/Hw1p+bUXFoa6zjGggXyF5RRyihl1LRpkAEZkPHhh0JxtGjBOpfYCHtaZWYKm7199hnrPMg8hOIYOFDYq+qLL0gOySE5XbqwziU6WtCC9tYtvhvfje82frzwh5SyjmUs+BC9mXAeR+vWPbf13NZz27ZtwvLTOXPgZ/gZfrahEwEflTu4g3tFhZyTc3IuKKi0tLS0tLShgXUsZBqGRSMuP7n85PLTrFk0kAbSwB07yAKygCxwdmadT6yIhEiI5I03NNmabE3211+zzmP078c6AGuGLRQMR6nCl/AlfNm5M+tcotX8xizEQAzEDBrEuXKunKvlLT9EjyZkQMiAkAHdu0tXS1dLV2/eDOtgHazz82OdS+zoO/Qd+s4nn2j8NH4av2nTWOcxFZu7slbGK+OV8e3a0RAaQkPWr4dJMAkmRUayzmUp6Al6gp6YMUMTr4nXxGNxWJtJEydNnDRRLq9+t/rd6nfnzBGOGF60CObDfJhvb886n+iVQzmUnz8vT5GnyFPi41nHMTWrn4EYBkRVv6p+Vf3efpt8Sb4kXyYkwAN4AA9cXFjnsxgfwAfwwcaNXE+uJ9dz+nTWcZBxKeIV8Yr4gAAygAwgA5KTYSfshJ19+7LOZSloCk2hKb/+SpNpMk3u31/YDNH6jymw2hlIWElYSViJv3+Va5VrletHH5GpZCqZ2rs361yWhqbSVJp6/Lh8mnyafBq+72ItwvuF9wvv9/zzfBe+C99l6VJhkUhEhPC/rNNZkBtwA240NkrUErVEHRmpXqteq7aB4jCwmgIxXEHBClgBKxYvppE0kkYOHkyAWP80yxTmwByY88MP8jh5nDxOqVRlqjJVmY2NrGOhf0ZYNdWjB9EQDdG8/z6fz+fz+TExQIAAscHdb59U87kdtDVtTVvHxnKhXCgXevw461jmZnF/txpWgxSdKTpTdCYwUHJAckByYOFC+Ba+hW/792edz+I1b+7GF/AFfMGgQVqiJVpy5QrrWOjxKHOUOcocLy9aSStp5ezZwjkbY8fa7HbpRkbv0rv07vvvaw5rDmsOr17NOg8rop+BGI6AlQZJg6RBb75ZsrRkacnSt9+WFEmKJEVubqzzWQ3DSYE34SbcHDkSi8MyGLbWaTGoxaAWg0JDSQSJIBGTJsFW2ApbX3vt4QzcERwBNxJ5YsKdjQ0bNFGaKE2U7RaHgWhmIIaBYN/Hvo99n5AQ8Ad/8B8/HjSgAU1AAF45mUg5lEP5gwdkFVlFVgUGqoPUQeqgggLWsdD/LTwqPCo8qndvfX99f33///yHPEeeI8+NGycURtu2rPNZrakwFabu3u3p7+nv6T9uXCJJJImE51nHYk00BfJw1841sAbW5OWxzmP1mh/+CVtPhIUJ73Ps28c6Fvr/CTsklJZCAzRAg4cH6zxWrw20gTZq9a0tt7bc2hIZeYwcI8eITsc6lljgbry2prk4+PX8en79qFFYHAj9H16D1+C1vLz64/XH64+PHYvF8X8T/TMQZCTNt6qgEAqhMCJC66p11WJxIPRHzTMOWaGsUFY4ZkzepbxLeZdw9eFfwQKxds3nDxA90RO9QqF2VbuqXY8cYR0LITGh4+g4Om7Xrtqw2rDasJgYnHE8GryFZa2adwGlx+lxenzYMLWn2lPticWB0B80QiM0pqRowjXhmvBx47A4Hg/OQKzNWlgLay9fllyVXJVc/fe/s6ZkTcmacvEi61gIiULzC4AQDdEQvXQpRzjCkYQE1rEsFRaItUiDNEj7+mvh4KuQkKzzWeezzldVsY6FkCg07yJNykk5KZ8wQU3URE127WIdy9JhgVi65vXpsqmyqbKpsbEqlUqlUj14wDoWQqLQvLOCcH5JeDjnwXlwHqdOsY5lLbBALE0d1EGdXg8LYAEsWLCAG8oN5YauWsU6FkKi4gd+4HfunOxL2ZeyL8PCVB4qD5XHtWusY1kbfIhuIeh2up1ur64Gb/AG74AALA6E/jfhiOVPPxWKY9AgYRNQLA5TwRmIyAkDoqBAPl4+Xj4+Olq4RXX9OutcCIlC8x5uJJtkk+wpU4RbVPhsw1ywQMQmAAIgQKeDyTAZJi9fLh8tHy0fnZQkFIdezzoeQqLwDXwD35w5Q/fSvXTvmDFcMpfMJVfgSSZmhgUiFpNhMkwuLSWxJJbEvvWWeop6inrKmTOsYyEkCn/Yu23Zslttb7W91XblSnxvgy0sEFaaH4bTTJpJM5OTG3wafBp8lizJq8yrzKtsaGAdDyFReAPegDe++w6GwBAY8tZbwt5t58+zjoUE+BDd3MqhHMrPn6fhNJyGDxqkcdI4aZzmzhX23MHiQDbOC7zA6/592pa2pW3nz3c96HrQ9eCLL2JxiBPOQEytHbSDdrdvUyVVUmVCgnyLfIt8y8aNqimqKaop+EwDIQAAeBFehBdzc/kF/AJ+wfTpeKCZZcACMTbDexre4A3eW7fq5ujm6OYsWpTTPqd9TvubN1nHQ0gUmp/50VpaS2vj44UT/vLyYCEshIWsw6FHhQViJHQ2nU1nHzlCakktqY2P54K5YC64uBiSIRmSWadDiDEHcACHmhr6Jn2TvpmUVBtQG1AbkJKCD8EtGxbIP5UMyZD81Vc0hsbQmMWLNb4aX41vfj7rWAiJwgyYATNqa6EP9IE+69bpf9D/oP/ho4+yfbN9s33r6ljHQ8aBBfKoDsEhOHT6NF/AF/AFK1Zo3bXuWvecHNaxEBIFd3AH97o6upAupAs/+YS2pq1p6w8+EJ5l3L7NOh4yDSyQv0D30D10z8mTtIgW0aJVq7ScltNyOTnQH/pDf9bpEGJsNIyG0TdvQhREQVRqamNQY1Bj0Mcf73Pa57TPqbaWdTxkHjZfIMJWIfX1wlGvKhV5hjxDnvnwQ42dxk5jV1zMOh9CYiCMk5ISYabx8cfysfKx8rE7dqjGqMaoxuCRr7bK5gqE7qK76K6LF8lpcpqc/vxz3T3dPd29LVtyp+ROyZ3y22+s8yHEkuGCiswj88i8nByylCwlS9PShD2m8ERL9EdWWyB/ORAcOAfOAQcCQgDwcNtzWkALaEFaGl/D1/A1u3dna7I12Zq6OtCABjSsQyKxsvgCoRk0g2bwPKkm1aT69GlhOW1GBg4EhP4bTaEpNOXXX+E4HIfjKpW0RFoiLUlPz3on652sd0pKHv6LOE7QY7CcAjHsHbWf7qf7T5+Go3AUjqpU8lh5rDw2M/N/bXOOAwHZIm/wBu8rV2Af7IN92dkknaST9JycWx1udbjVobDwWNSxqGNR+N4FMg7xFUg5lEP5gwcwBsbAmPx8YW8clYoP4oP4oOxsXBaIEPz3m9wv05fpyzk5xI24EbfcXI7jOI47eVL4lygFT/AET9ZhETKxkd1Hdh/Z/emnIyIiIiIiHBxY50FIjIJvBt8Mvtm+PescCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCSHT+C5khPothU4qHAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTA1LTE0VDIyOjAyOjUyKzA4OjAw/o369QAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wNS0xNFQyMjowMjo1MiswODowMI/QQkkAAABPdEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL2hvbWUvYWRtaW4vaWNvbi1mb250L3RtcC9pY29uXzU2ejNqN2xpMjlmL3NodWFuZ3lpbmhhby5zdmdC5tPUAAAAAElFTkSuQmCC"

/***/ }),
/* 65 */
/*!***********************************************************************************!*\
  !*** C:/web_gz/proj/hybridApp--/uniapp/hello-uniapp/static/svg/shuangxiegang.png ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 66 */
/*!*******************************************************************************!*\
  !*** C:/web_gz/proj/hybridApp--/uniapp/hello-uniapp/static/svg/Underline.png ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 67 */
/*!**************************************************************************!*\
  !*** C:/web_gz/proj/hybridApp--/uniapp/hello-uniapp/static/svg/mulu.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 68 */
/*!**************************************************************************!*\
  !*** C:/web_gz/proj/hybridApp--/uniapp/hello-uniapp/static/svg/rili.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map