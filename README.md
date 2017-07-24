# JWT Manager

[![Build Status](https://travis-ci.org/GeorgeHanson/jwt-manager.svg?branch=master)](https://travis-ci.org/GeorgeHanson/jwt-manager)
[![npm version](https://badge.fury.io/js/jwt-manager.svg)](https://badge.fury.io/js/jwt-manager)
[![npm](https://img.shields.io/npm/dt/jwt-manager.svg)](https://www.npmjs.com/package/jwt-manager)

JWT Manager is a Javascript Library designed to make storing and retrieving JWT tokens easier. It has an easy to use API
designed to make working with JSON Web Tokens much easier. It is written using Typescript and has **no dependencies**.

## Installation
You can install this package by running `npm install --save jwt-manager`.

You can then import the library using the following:

```js
import JWTManager from 'jwt-manager';
window.JWTManager = new JWTManager();
```

## Usage
Using the JWT Manager library you can set, get, forget and refresh JWT Tokens. By default they are stored as a cookie, however you can change this to local storage if you would prefer.
To change the store to local storage, simply use the following:
```js
window.JWTManager.useLocalStore();
```

### Setting JWT Tokens
Once you retrieve a valid JWT Token from your server, you can store the JWT token by using the following method call: `JWTManager.setToken('jwt-token')`. This will then store the JWT Token in the storage driver chosen (defaults to cookie).

### Getting JWT Tokens
Once you have set a JWT Token, you can easily retrieve it at any time by using the following method call `JWTManager.getToken()`. This will then return the JWT Token.

### Forgetting JWT Tokens
If you would like to remove the stored JWT Token, you can simply call the `forget` method as follows: `JWTManager.forget()`.

### Refreshing JWT Tokens
To refresh a JWT Token, you simply need to call the `refresh` method: `JWTManager.refresh('new-jwt-token')`.

### Decoding Tokens
If you would like to decode the JWT token, you can simply use the `decode` method: `JWTManager.decode()`. This will check to see if there is a token set and if there is, it will decode it and return the decoded object.

### Monitoring Tokens
When dealing with JWT Tokens it is useful to monitor when the token is close to expiring so a request can be made to generate a new token. JWT manager handles this using a useful `monitor` method. For example:

```javascript
window.JWTManager.monitor((token) => {
    // Make request to refresh token here
    // Then call the JWTManager.refresh() method and pass in your new token
});
```

This will then check on an interval basis to see if the JWT Token is going to expire within the next 60 seconds. If it is, it will run the callback. You can also pass a second parameter to the `monitor` function. This will set the number of seconds until the token expires, before it triggers the callback. By default it is set to 60. In the below example, it will trigger the callback when the token is due to expire within the next 30 seconds.

```javascript
window.JWTManager.monitor((token) => {
    // Make request to refresh token here
    // Then call the JWTManager.refresh() method and pass in your new token
}, 30);
```

JWT Manager will automatically check in ten second intervals.

## Test Suite
You can run the test suite by running `npm run test`
