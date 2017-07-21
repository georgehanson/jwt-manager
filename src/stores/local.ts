import { Store as Contract} from './../interfaces/store';

export class Local implements Contract
{
    /**
     * Store the token
     *
     * @param token
     */
    public store(token: string): void {
        localStorage.setItem('jwt', token);
    }

    /**
     * Retrieve the token
     */
    public retrieve(): string {
        let result = localStorage.getItem('jwt');

        return result ? result : "";
    }

    /**
     * Forget the token
     */
    public forget(): void {
        localStorage.removeItem('jwt');
    }
}