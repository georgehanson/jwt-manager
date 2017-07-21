jest.mock('../src/stores/cookie');
jest.mock('../src/stores/local');
import {Local} from "../src/stores/local";
import {Cookie} from "../src/stores/cookie";
import {JWTManager} from '../src/index';
import {Token} from "../src/token";
const tokenValue = 'test-token';

test("A token can be stored", () => {
    let manager = new JWTManager();
    manager.setToken(tokenValue);
    expect(manager.store.store).toHaveBeenCalledWith(tokenValue);
});

test("The manager can be changed to use local storage", () => {
    let manager = new JWTManager();
    manager.decoder.useLocalStore = jest.fn();
    manager.useLocalStore();
    expect(manager.store).toBeInstanceOf(Local);
    expect(manager.decoder.useLocalStore).toHaveBeenCalled();
});

test("A token can be retrieved from the store", () => {
    let manager = new JWTManager();
    manager.setToken(tokenValue);
    manager.getToken();
    expect(manager.store.retrieve).toHaveBeenCalled();
});

test("A token can be forgotten from the store", () => {
    let manager = new JWTManager();
    manager.setToken(tokenValue);
    manager.forget();
    expect(manager.store.forget).toHaveBeenCalled();
});

test("A token can be refreshed", () => {
    let manager = new JWTManager();
    manager.refresh('test');
    expect(manager.store.forget).toHaveBeenCalled();
    expect(manager.store.store).toHaveBeenCalledWith('test');
});

test("A token can be decoded", () => {
    let manager = new JWTManager();
    manager.decoder.store.retrieve = jest.fn().mockReturnValue('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTAwNjUwMjIwLCJleHAiOjE1MDA2NTM4MzksImp0aSI6IjA5MTMxNTgwLTFlYmEtNDMyMS05M2ViLTRhOGVkMGY1NGFiMyJ9._6IK4WJnzpWtUvWRF3jsUru21SaZrKnhKHx9pTyXkKs');
    let decoded = manager.decode();
    expect(decoded).toBeInstanceOf(Token);
});

test("The token can be monitored", () => {
    jest.useFakeTimers();

    let manager = new JWTManager();
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTAwNjUwMjIwLCJleHAiOjE1MDA2NTM4MzksImp0aSI6IjA5MTMxNTgwLTFlYmEtNDMyMS05M2ViLTRhOGVkMGY1NGFiMyJ9._6IK4WJnzpWtUvWRF3jsUru21SaZrKnhKHx9pTyXkKs';
    manager.decoder.store.retrieve = jest.fn().mockReturnValue(token);
    manager.store.retrieve = jest.fn().mockReturnValue(token);

    let callback = jest.fn(cb => {
        manager.decoder.store.retrieve = jest.fn().mockReturnValue("");
    });

    Date.now = jest.genMockFunction().mockReturnValue(1500653839);

    manager.monitor(callback);

    jest.runTimersToTime(20000);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(token);
});