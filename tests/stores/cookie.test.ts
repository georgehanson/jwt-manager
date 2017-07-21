import { Cookie } from '../../src/stores/cookie';

test("It can store the new token", () => {
    let CookieStore = new Cookie();
    CookieStore.store('test');
    expect(document.cookie.includes('jwt')).toBe(true);
});

test("It can get the token", () => {
    let CookieStore = new Cookie();
    CookieStore.store('test');
    let token = CookieStore.retrieve();
    expect(token).toBe('test');
});

test("It can forget the token", () => {
    let CookieStore = new Cookie();
    CookieStore.store('test');
    expect(document.cookie.includes('jwt')).toBe(true);
    CookieStore.forget();
    expect(document.cookie.includes('jwt')).toBe(false);
});