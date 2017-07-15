import JWTManager from './../src/JWTManager';

const tokenValue = 'testtoken';

jest.mock('./../src/Stores/Local');
const LocalStore = require('./../src/Stores/Local');
LocalStore.set = jest.fn();
LocalStore.get = jest.fn().mockReturnValue(tokenValue);
LocalStore.forget = jest.fn();
jest.mock('./../src/Stores/Cookie');
const CookieStore = require('./../src/Stores/Cookie');
CookieStore.set = jest.fn();
CookieStore.get = jest.fn().mockReturnValue(tokenValue);
CookieStore.forget = jest.fn();

test('A token can be stored in a cookie', () => {
    let manager = new JWTManager();
    manager.setToken(tokenValue);
    expect(CookieStore.set).toHaveBeenCalledWith(tokenValue);
});

test('A token can be set into local storage', () => {
    let manager = new JWTManager();
    manager.config.store = 'local';
    manager.setToken(tokenValue);
    expect(LocalStore.set).toHaveBeenCalledWith(tokenValue);
});

test('A token can be retrieved from local storage', () => {
    let manager = new JWTManager();
    manager.config.store = 'local';
    let token = manager.getToken();
    expect(LocalStore.set).toHaveBeenCalled();
    expect(token).toBe(tokenValue);
});

test('A token can be retrieved from the cookies', () => {
    let manager = new JWTManager();
    let token = manager.getToken();
    expect(CookieStore.set).toHaveBeenCalled();
    expect(token).toBe(tokenValue);
});

test('A token can be forgotten from local storage', () => {
    let manager = new JWTManager();
    manager.config.store = 'local';
    manager.forget();
    expect(LocalStore.forget).toHaveBeenCalled();
});

test('A token can be forgotten from the cookie store', () => {
    let manager = new JWTManager();
    manager.forget();
    expect(CookieStore.forget).toHaveBeenCalled();
});