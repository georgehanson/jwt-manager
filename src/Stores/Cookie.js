const cookies = require('js-cookie');

class Cookie
{
    set(token)
    {
        cookies.set('jwt', token);
    }

    get()
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

export default Cookie;