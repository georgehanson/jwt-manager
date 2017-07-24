import {Cookie} from '../src/stores/cookie';
import {Decoder} from "../src/decoder";

test("It can decode a JWT Token", () => {
    let DecoderClass = new Decoder();
    let Store = new Cookie();
    Store.store('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTAwNjUwMjIwLCJleHAiOjE1MDA2NTM4MzksImp0aSI6IjA5MTMxNTgwLTFlYmEtNDMyMS05M2ViLTRhOGVkMGY1NGFiMyJ9._6IK4WJnzpWtUvWRF3jsUru21SaZrKnhKHx9pTyXkKs');
    let decoded = DecoderClass.decode();
    expect(decoded.getExpiry()).toBe(1500653839);
});