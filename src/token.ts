export class Token {

    /**
     * The decoded jwt token
     */
    private decoded: object;

    /**
     * Get the expiry
     */
    private expiry: number;

    /**
     * Constructor
     * @param decoded
     */
    constructor(decoded: any)
    {
        this.decoded = decoded;
        this.expiry = decoded.exp;
    }

    /**
     * Get the payload
     *
     * @returns {any}
     */
    public getPayload(): object
    {
        return this.decoded;
    }

    /**
     * Get the expiry
     */
    public getExpiry(): number
    {
        return this.expiry;
    }
}