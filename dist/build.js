/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Local {
    store(token) {
        localStorage.setItem('jwt', token);
    }
    retrieve() {
        let result = localStorage.getItem('jwt');
        return result ? result : "";
    }
    forget() {
        localStorage.removeItem('jwt');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Local;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Cookie {
    store(token) {
        let date = this.getExpiryDate();
        document.cookie = `jwt=${token};expires=${date.toUTCString()};path=/`;
    }
    retrieve() {
        let key = 'jwt=';
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookieArray = decodedCookie.split(';');
        let cookieArrayLength = cookieArray.length;
        for (let i = 0; i < cookieArrayLength; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(key) == 0) {
                return cookie.substring(key.length, cookie.length);
            }
        }
        return "";
    }
    forget() {
        document.cookie = 'jwt=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    }
    getExpiryDate() {
        let date = new Date();
        return new Date(date.getTime() + 86400000);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Cookie;



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stores_local__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_cookie__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__decoder__ = __webpack_require__(4);



class JWTManager {
    constructor() {
        this.secondsInterval = 10;
        this.store = new __WEBPACK_IMPORTED_MODULE_1__stores_cookie__["a" /* Cookie */]();
        this.decoder = new __WEBPACK_IMPORTED_MODULE_2__decoder__["a" /* Decoder */]();
    }
    setToken(token) {
        this.store.store(token);
    }
    getToken() {
        return this.store.retrieve();
    }
    forget() {
        this.store.forget();
    }
    refresh(token) {
        this.store.forget();
        this.store.store(token);
    }
    decode() {
        return this.decoder.decode();
    }
    monitor(callback, secondsLimit = 60) {
        setInterval(() => {
            try {
                let remainingSeconds = this.secondsRemaining();
                if (remainingSeconds <= secondsLimit) {
                    callback(this.getToken());
                }
            }
            catch (e) {
            }
        }, this.getSecondsInterval());
    }
    useLocalStore() {
        this.store = new __WEBPACK_IMPORTED_MODULE_0__stores_local__["a" /* Local */]();
        this.decoder.useLocalStore();
    }
    secondsRemaining() {
        let token = this.decode();
        if (token) {
            return token.getExpiry() - (Date.now() / 1000);
        }
    }
    hasTokenExpired() {
        let secondsRemaining = this.secondsRemaining();
        if (!secondsRemaining) {
            return false;
        }
        return secondsRemaining < 0;
    }
    getSecondsInterval() {
        return this.secondsInterval * 1000;
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = JWTManager;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stores_cookie__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stores_local__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__token__ = __webpack_require__(5);



class Decoder {
    constructor() {
        this.store = new __WEBPACK_IMPORTED_MODULE_0__stores_cookie__["a" /* Cookie */]();
    }
    useLocalStore() {
        this.store = new __WEBPACK_IMPORTED_MODULE_1__stores_local__["a" /* Local */]();
    }
    decode() {
        let token = this.store.retrieve();
        if (token) {
            let sectioned = token.split('.')[1];
            let replaced = sectioned.replace('-', '+').replace('_', '/');
            let decoded = JSON.parse(window.atob(replaced));
            return new __WEBPACK_IMPORTED_MODULE_2__token__["a" /* Token */](decoded);
        }
        throw new TypeError("No token has been set");
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Decoder;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Token {
    constructor(decoded) {
        this.decoded = decoded;
        this.expiry = decoded.exp;
    }
    getPayload() {
        return this.decoded;
    }
    getExpiry() {
        return this.expiry;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Token;



/***/ })
/******/ ]);