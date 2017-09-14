import {Store} from "./interfaces/store";
import {Local} from "./stores/local";
import {Cookie} from "./stores/cookie";
import {Decoder} from "./decoder";
import {Token} from "./token";

class JWTManager {

    /**
     * The number of seconds for each interval check
     *
     * @type {number}
     */
    private secondsInterval: number = 10;

    /**
     * The current store
     */
    private store: Store = new Cookie();

    /**
     * The decoder instance
     */
    private decoder: Decoder = new Decoder();

    /**
     * Set the token
     *
     * @param token
     */
    public setToken(token: string): void {
        this.store.store(token);
    }

    /**
     * Get the token from the store
     */
    public getToken(): string {
        return this.store.retrieve();
    }

    /**
     * Forget the current token
     */
    public forget(): void {
        this.store.forget();
    }

    /**
     * Forget the old token and replace it with the new one
     *
     * @param token
     */
    public refresh(token: string): void {
        this.store.forget();
        this.store.store(token);
    }

    /**
     * Decode the JWT Token
     *
     * @returns Token
     */
    public decode(): Token {
        return this.decoder.decode();
    }

    /**
     * Monitor the token for when it needs refreshing
     *
     * @param callback
     * @param secondsLimit
     */
    public monitor(callback: (token: string) => void, secondsLimit: number = 60): void {
        setInterval(() => {
            try {
                let remainingSeconds = this.secondsRemaining();

                if (remainingSeconds <= secondsLimit) {
                    callback(this.getToken());
                }
            } catch (e) {

            }
        }, this.getSecondsInterval());
    }

    /**
     * Set the store to the local store
     */
    public useLocalStore(): void {
        this.store = new Local();
        this.decoder.useLocalStore();
    }

    /**
     * Get the number of remaining seconds until the token expires
     * @return {number} [description]
     */
    public secondsRemaining(): number {
        let token = this.decode();

        if (token) {
            return token.getExpiry() - (Date.now() / 1000);
        }
    }

    /**
     * Check to see if the token has expired
     *
     * @return {boolean} [description]
     */
    public hasTokenExpired(): boolean {
        let secondsRemaining = this.secondsRemaining();

        if (! secondsRemaining) {
            return false;
        }

        return secondsRemaining < 0;
    }

    /**
     * Get the number of seconds for intervals
     */
    private getSecondsInterval(): number {
        return this.secondsInterval * 1000;
    }
}

export default JWTManager;
