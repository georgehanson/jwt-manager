import JWTManager from './../src/JWTManager';

test('A token can be set', () => {
    let manager = new JWTManager();
    expect(manager.token).toBe(null);
    manager.setToken('test');
    expect(manager.token).toBe('test');
});

test('A token can be retrieved', () => {
    let manager = new JWTManager();
    manager.setToken('test');

    let token = manager.getToken();
    expect(token).toBe('test');
});

test('A token can be forgotten', () => {
    let manager = new JWTManager();
    manager.setToken('test');
    manager.forget();
    let token = manager.getToken();
    expect(token).toBe(null);
});

test('A token can be forgotten', () => {
    let manager = new JWTManager();
    manager.setToken('test');
    manager.forget();
    let token = manager.getToken();
    expect(token).toBe(null);
});

