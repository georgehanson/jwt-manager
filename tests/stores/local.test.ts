import { Local } from '../../src/stores/local';

test("It can store the new token", () => {
    let LocalStore = new Local();
    LocalStore.store('test');
    expect(localStorage.setItem).toHaveBeenCalledWith('jwt', 'test');
});

test("It can get the token", () => {
    let LocalStore = new Local();
    LocalStore.store('test');
    expect(localStorage.setItem).toHaveBeenLastCalledWith('jwt', 'test');
    expect(localStorage.__STORE__['jwt']).toBe('test');

    let token = LocalStore.retrieve();

    expect(localStorage.getItem).toHaveBeenLastCalledWith('jwt');
    expect(token).toBe('test');
});

test("It can forget the token", () => {
    let LocalStore = new Local();
    LocalStore.store('test');
    expect(localStorage.setItem).toHaveBeenLastCalledWith('jwt', 'test');
    expect(localStorage.__STORE__['jwt']).toBe('test');
    LocalStore.forget();
    expect(localStorage.removeItem).toHaveBeenLastCalledWith('jwt');
});