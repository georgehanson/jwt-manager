class JWTManager
{
    /**
     * Construct the class
     */
    constructor() {
        this.token = null;
        this.config = {};
    }

    /**
     * Set the token
     *
     * @param token
     * @returns {string}
     */
    setToken(token)
    {
        this.token = token;

        return token;
    }

    /**
     * Get the JWT Token
     *
     * @returns {string|null}
     */
    getToken()
    {
        return this.token;
    }

    /**
     * Forget the current token
     */
    forget()
    {
        this.token = null;
    }
}

export default JWTManager;