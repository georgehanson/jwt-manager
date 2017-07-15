# JWT Manager

[![Build Status](https://travis-ci.org/GeorgeHanson/jwt-manager.svg?branch=master)](https://travis-ci.org/GeorgeHanson/jwt-manager)

JWT Manager is a Javascript Library designed to make storing and retrieving JWT tokens easier. It has an easy to use API
designed to make working with JSON Web Tokens much easier.

## Installation
You can install this package by running `npm install --save jwt-manager`.

You can then import the library using the following:

```js
Import JWTManager from 'jwt-manager';
const JWTManager = new JWTManager();
````

or

```js
const JWTManager = require('jwt-manager');
```

## Usage
Using the JWT Manager library you can set, get, forget and refresh JWT Tokens. By default they are stored as a cookie, however you can change this to local storage if you would prefer.
To change the store to local storage, simply use the following:
```js
JWTManager.config.store = 'local';
```

### Setting JWT Tokens
Once you retrieve a valid JWT Token from your server, you can store the JWT token by using the following method call: `JWTManager.setToken('jwt-token')`. This will then store the JWT Token in the storage driver chosen (defaults to cookie).

### Getting JWT Tokens
Once you have set a JWT Token, you can easily retrieve it at any time by using the following method call `JWTManager.getToken()`. This will then return the JWT Token.

### Forgetting JWT Tokens
If you would like to remove the stored JWT Token, you can simply call the `forget` method as follows: `JWTManager.forget()`.

### Refreshing JWT Tokens
To refresh a JWT Token, you simply need to call the `refresh` method: `JWTManager.refresh('new-jwt-token')`.

## Test Suite
You can run the test suite by running `npm run test`