var Local = function () {
    function Local() {}
    /**
     * Store the token
     *
     * @param token
     */
    Local.prototype.store = function (token) {
        localStorage.setItem('jwt', token);
    };
    /**
     * Retrieve the token
     */
    Local.prototype.retrieve = function () {
        var result = localStorage.getItem('jwt');
        return result ? result : "";
    };
    /**
     * Forget the token
     */
    Local.prototype.forget = function () {
        localStorage.removeItem('jwt');
    };
    return Local;
}();

var Cookie = function () {
    function Cookie() {}
    /**
     * Store the token
     *
     * @param token
     */
    Cookie.prototype.store = function (token) {
        var date = this.getExpiryDate();
        document.cookie = "jwt=" + token + ";expires=" + date.toUTCString() + ";path=/";
    };
    /**
     * Retrieve the token
     */
    Cookie.prototype.retrieve = function () {
        var key = 'jwt=';
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');
        var cookieArrayLength = cookieArray.length;
        for (var i = 0; i < cookieArrayLength; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(key) == 0) {
                return cookie.substring(key.length, cookie.length);
            }
        }
        return "";
    };
    /**
     * Forget the token
     */
    Cookie.prototype.forget = function () {
        document.cookie = 'jwt=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    };
    /**
     * Get the expiry date
     */
    Cookie.prototype.getExpiryDate = function () {
        var date = new Date();
        return new Date(date.getTime() + 86400000);
    };
    return Cookie;
}();

var Token = function () {
    /**
     * Constructor
     * @param decoded
     */
    function Token(decoded) {
        this.decoded = decoded;
        this.expiry = decoded.exp;
    }
    /**
     * Get the payload
     *
     * @returns {any}
     */
    Token.prototype.getPayload = function () {
        return this.decoded;
    };
    /**
     * Get the expiry
     */
    Token.prototype.getExpiry = function () {
        return this.expiry;
    };
    return Token;
}();

var Decoder = function () {
    function Decoder() {
        /**
         * The store instance
         *
         * @type {Cookie}
         */
        this.store = new Cookie();
    }
    /**
     * Use the local store instead
     */
    Decoder.prototype.useLocalStore = function () {
        this.store = new Local();
    };
    /**
     * Decode the token
     *
     * @returns {any}
     */
    Decoder.prototype.decode = function () {
        var token = this.store.retrieve();
        if (token) {
            var sectioned = token.split('.')[1];
            var replaced = sectioned.replace('-', '+').replace('_', '/');
            var decoded = JSON.parse(window.atob(replaced));
            return new Token(decoded);
        }
        throw new TypeError("No token has been set");
    };
    return Decoder;
}();

var JWTManager = function () {
    function JWTManager() {
        /**
         * The number of seconds for each interval check
         *
         * @type {number}
         */
        this.secondsInterval = 10;
        /**
         * The current store
         */
        this.store = new Cookie();
        /**
         * The decoder instance
         */
        this.decoder = new Decoder();
    }
    /**
     * Set the token
     *
     * @param token
     */
    JWTManager.prototype.setToken = function (token) {
        this.store.store(token);
    };
    /**
     * Get the token from the store
     */
    JWTManager.prototype.getToken = function () {
        return this.store.retrieve();
    };
    /**
     * Forget the current token
     */
    JWTManager.prototype.forget = function () {
        this.store.forget();
    };
    /**
     * Forget the old token and replace it with the new one
     *
     * @param token
     */
    JWTManager.prototype.refresh = function (token) {
        this.store.forget();
        this.store.store(token);
    };
    /**
     * Decode the JWT Token
     *
     * @returns Token
     */
    JWTManager.prototype.decode = function () {
        return this.decoder.decode();
    };
    /**
     * Monitor the token for when it needs refreshing
     *
     * @param callback
     * @param remainingSeconds
     */
    JWTManager.prototype.monitor = function (callback, remainingSeconds) {
        var _this = this;
        if (remainingSeconds === void 0) {
            remainingSeconds = 60;
        }
        setInterval(function () {
            try {
                var decoded = _this.decode();
                var secondsUntilExpiry = decoded.getExpiry() / 1000 - Date.now() / 1000;
                if (secondsUntilExpiry <= remainingSeconds) {
                    callback(_this.getToken());
                }
            } catch (e) {}
        }, this.getSecondsInterval());
    };
    /**
     * Set the store to the local store
     */
    JWTManager.prototype.useLocalStore = function () {
        this.store = new Local();
        this.decoder.useLocalStore();
    };
    /**
     * Get the number of seconds for intervals
     */
    JWTManager.prototype.getSecondsInterval = function () {
        return this.secondsInterval * 1000;
    };
    return JWTManager;
}();

export default JWTManager;