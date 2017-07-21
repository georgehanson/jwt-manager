import { Store as Contract} from './../interfaces/store';

export class Cookie implements Contract
{
    /**
     * Store the token
     *
     * @param token
     */
    public store(token: string): void {
        let date = this.getExpiryDate();

        document.cookie = `jwt=${token};expires=${date.toUTCString()};path=/`;
    }

    /**
     * Retrieve the token
     */
    public retrieve(): string {
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

    /**
     * Forget the token
     */
    public forget(): void {
        document.cookie = 'jwt=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    }

    /**
     * Get the expiry date
     */
    private getExpiryDate(): Date {
        let date = new Date();

        return new Date(date.getTime() + 86400000);
    }
}