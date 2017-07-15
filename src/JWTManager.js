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
            expiryCheck: 60
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