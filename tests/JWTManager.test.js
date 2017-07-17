const JWTManager = require('./../src/JWTManager');

const tokenValue = 'testtoken';

jest.mock('jwt-decode');
const JWTDecode = require('jwt-decode').mockReturnValue({
    exp: 1234
});

jest.mock('./../src/Stores/Local');
const LocalStore = require('./../src/Stores/Local');
LocalStore.store = jest.fn();
LocalStore.retrieve = jest.fn().mockReturnValue(tokenValue);
LocalStore.forget = jest.fn();
jest.mock('./../src/Stores/Cookie');
const CookieStore = require('./../src/Stores/Cookie');
CookieStore.store = jest.fn();
CookieStore.retrieve = jest.fn().mockReturnValue(tokenValue);
CookieStore.forget = jest.fn();

test('A token can be stored in a cookie', () => {
    let manager = new JWTManager();
    manager.store = CookieStore;
    manager.setToken(tokenValue);
    expect(CookieStore.store).toHaveBeenCalledWith(tokenValue);
});

test('A token can be set into local storage', () => {
    let manager = new JWTManager();
    manager.config.store = 'local';
    manager.store = LocalStore;
    manager.setToken(tokenValue);
    expect(LocalStore.store).toHaveBeenCalledWith(tokenValue);
});

test('A token can be retrieved from local storage', () => {
    let manager = new JWTManager();
    manager.config.store = 'local';
    manager.store = LocalStore;
    let token = manager.getToken();
    expect(LocalStore.retrieve).toHaveBeenCalled();
    expect(token).toBe(tokenValue);
});

test('A token can be retrieved from the cookies', () => {
    let manager = new JWTManager();
    manager.store = CookieStore;
    let token = manager.getToken();
    expect(CookieStore.retrieve).toHaveBeenCalled();
    expect(token).toBe(tokenValue);
});

test('A token can be forgotten from local storage', () => {
    let manager = new JWTManager();
    manager.store = LocalStore;
    manager.config.store = 'local';
    manager.forget();
    expect(LocalStore.forget).toHaveBeenCalled();
});

test('A token can be forgotten from the cookie store', () => {
    let manager = new JWTManager();
    manager.store = CookieStore;
    manager.forget();
    expect(CookieStore.forget).toHaveBeenCalled();
});

test('A token can be refreshed for local storage', () => {
    let manager = new JWTManager();
    manager.store = LocalStore;
    manager.config.store = 'local';
    manager.refresh('test');
    expect(LocalStore.forget).toHaveBeenCalled();
    expect(LocalStore.store).toHaveBeenCalledWith('test');
});

test('A token can be refreshed for cookie storage', () => {
    let manager = new JWTManager();
    manager.store = CookieStore;
    manager.refresh('test');
    expect(CookieStore.forget).toHaveBeenCalled();
    expect(CookieStore.store).toHaveBeenCalledWith('test');
});

test('A token can be decoded', () => {
    let manager = new JWTManager();
    manager.store = CookieStore;
    let token = manager.decode();
    expect(JWTDecode).toHaveBeenCalled();
    expect(token.exp).toBe(1234);
});

test('The JWT Token can be monitored', () => {
    let manager = new JWTManager();
    manager.store = CookieStore;
    manager.decode = jest.fn().mockReturnValue({
        exp: (Date.now() / 1000) + 63
    });
    let callback = jest.fn();

    manager.monitor(callback, 60);

    setTimeout(() => {
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(tokenValue);
    }, 7);
});