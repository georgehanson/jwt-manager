const cookies = require('js-cookie');

class Cookie
{
    constructor()
    {

    }

    store(token)
    {
        cookies.set('jwt', token);
    }

    retrieve()
    {
        if (cookies.get('jwt')) {
            return cookies.get('jwt');
        }

        return null;
    }

    forget()
    {
        cookies.remove('jwt');
    }
}

module.exports = Cookie;