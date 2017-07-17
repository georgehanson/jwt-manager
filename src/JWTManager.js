let CookieStore = require('./Stores/Cookie');
let LocalStore = require('./Stores/Local');
const JWTDecode = require('jwt-decode');

class JWTManager {
    /**
     * Construct the class
     */
    constructor() {
        this.config = {
            store: 'cookie',
            secondsInterval: 3
        };
        this.store = null;
    }

    /**
     * Set the token
     *
     * @param token
     * @returns {string}
     */
    setToken(token) {
        let Store = this.getStore();

        Store.store(token);

        return token;
    }

    /**
     * Get the JWT Token
     *
     * @returns {string|null}
     */
    getToken() {
        let Store = this.getStore();
        
        return Store.retrieve();
    }

    /**
     * Forget the current token
     */
    forget() {
        let Store = this.getStore();

        Store.forget();
    }

    /**
     * Forget the old token and set the new token
     *
     * @param token
     */
    refresh(token)
    {
        let Store = this.getStore();
        Store.forget();
        Store.store(token);
    }

    /**
     * Decode the current token
     *
     * @return {object}
     */
    decode()
    {
        let token = this.getToken();

        if (token) {
            return JWTDecode(token);
        }
    }

    /**
     * Run the callback automatically when the token is
     * due to expire within the given remainingSeconds
     *
     * @param {callable} callback
     * @param {int} remainingSeconds
     */
    monitor(callback, remainingSeconds = 60)
    {
        setInterval(() => {
            let decoded = this.decode();

            if (decoded) {
                let secondsUntilExpiry = decoded.exp - (Date.now() / 1000);

                if (secondsUntilExpiry <= remainingSeconds) {
                    callback(this.getToken());
                }
            }
        }, this.config.secondsInterval);
    }

    /**
     * Get the store
     */
    getStore() {
        if (! this.store) {
            this.resolveStore();
        }

        return this.store;
    }

    /**
     * Resolve the store and cache it
     *
     * @return {void}
     */
    resolveStore()
    {
        if (this.config.store === 'local') {
            this.store = new LocalStore();
        } else if (this.config.store === 'cookie') {
            this.store = new CookieStore();
        }
    }
}

module.exports = JWTManager;