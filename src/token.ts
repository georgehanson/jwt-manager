export class Token {

    /**
     * The decoded jwt token
     */
    private decoded: object;

    /**
     * Constructor
     * @param decoded
     */
    constructor(decoded: object)
    {
        this.decoded = decoded;
    }

    /**
     * Get the payload
     *
     * @returns {any}
     */
    public getPayload(): object
    {
        return this.decoded.payload;
    }

    /**
     * Get the expiry
     */
    public getExpiry(): number
    {
        return this.getPayload().exp;
    }
}