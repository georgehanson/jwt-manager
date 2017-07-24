import {Store} from "./interfaces/store";
import {Cookie} from "./stores/cookie";
import {Local} from "./stores/local";
import {Token} from "./token";

export class Decoder {

    /**
     * The store instance
     *
     * @type {Cookie}
     */
    private store: Store = new Cookie();

    /**
     * Use the local store instead
     */
    public useLocalStore():void {
        this.store = new Local();
    }

    /**
     * Decode the token
     *
     * @returns {any}
     */
    public decode(): Token {
        let token = this.store.retrieve();

        if (token) {
            let sectioned = token.split('.')[1];
            let replaced = sectioned.replace('-', '+').replace('_', '/');
            let decoded = JSON.parse(window.atob(replaced));

            return new Token(decoded);
        }

        throw new TypeError("No token has been set");
    }
}