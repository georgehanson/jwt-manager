const LocalStore = require('./Stores/Local');
const CookieStore = require('./Stores/Cookie');
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
    }

    /**
     * Set the token
     *
     * @param token
     * @returns {string}
     */
    setToken(token) {
        let Store = this.getStore();

        Store.set(token);

        return token;
    }

    /**
     * Get the JWT Token
     *
     * @returns {string|null}
     */
    getToken() {
        let Store = this.getStore();
        
        return Store.get();
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
        Store.set(token);
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
     * @param {int} remainingSeconds
     * @param {callable} callback
     */
    monitor(remainingSeconds = 60, callback)
    {
        setInterval(() => {
            let decoded = this.decode();
            let secondsUntilExpiry = decoded.exp - (Date.now() / 1000);

            if (secondsUntilExpiry <= remainingSeconds) {
                callback();
            }
        }, this.config.secondsInterval);
    }

    /**
     * Get the store
     */
    getStore() {
        if (this.config.store === 'local') {
            return LocalStore;
        } else if (this.config.store === 'cookie') {
            return CookieStore;
        }
    }
}

export default JWTManager;