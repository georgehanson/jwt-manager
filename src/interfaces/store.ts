export interface Store {

    /**
     * Store the token
     *
     * @param token
     * @return void
     */
    store(token: string): void

    /**
     * Retrieve the token from the store
     *
     * @return string|null
     */
    retrieve(): string|null

    /**
     * Forget the token from the store
     *
     * @return void
     */
    forget(): void
}