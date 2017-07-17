import Local from './../../src/Stores/Local';

test("It can store the token", () => {
    let Store = new Local();
    Store.store('test');
    expect(localStorage.setItem).toHaveBeenLastCalledWith('jwt', 'test');
    expect(localStorage.__STORE__['jwt']).toBe('test');
});

test("It can get the token", () => {
    let Store = new Local();
    Store.store('test');
    expect(localStorage.setItem).toHaveBeenLastCalledWith('jwt', 'test');
    expect(localStorage.__STORE__['jwt']).toBe('test');

    let token = Store.retreive();

    expect(localStorage.getItem).toHaveBeenLastCalledWith('jwt');
    expect(token).toBe('test');
});

test("It can forget the token", () => {
    let Store = new Local();
    Store.store('test');
    expect(localStorage.setItem).toHaveBeenLastCalledWith('jwt', 'test');
    expect(localStorage.__STORE__['jwt']).toBe('test');
    Store.forget();
    expect(localStorage.removeItem).toHaveBeenLastCalledWith('jwt');
});