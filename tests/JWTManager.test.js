import JWTManager from './../src/JWTManager';
jest.mock('./../src/Stores/Local');
const LocalStore = require('./../src/Stores/Local');
LocalStore.set = jest.fn();

test('A token can be set ', () => {
    let manager = new JWTManager();
    expect(manager.token).toBe(null);
    manager.setToken('test');
    expect(manager.token).toBe('test');
});

test('A token can be set into local storage', () => {
    let manager = new JWTManager();
    manager.config.store = 'local';
    manager.setToken('test');
    expect(LocalStore.set).toHaveBeenCalledWith('test');
});
//
// test('A token can be retrieved', () => {
//     let manager = new JWTManager();
//     manager.setToken('test');
//
//     let token = manager.getToken();
//     expect(token).toBe('test');
// });
//
// test('A token can be forgotten', () => {
//     let manager = new JWTManager();
//     manager.setToken('test');
//     manager.forget();
//     let token = manager.getToken();
//     expect(token).toBe(null);
// });
//
// test('A token can be forgotten', () => {
//     let manager = new JWTManager();
//     manager.setToken('test');
//     manager.forget();
//     let token = manager.getToken();
//     expect(token).toBe(null);
// });