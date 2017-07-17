class Local
{
    constructor()
    {

    }

    store(token)
    {
        localStorage.setItem('jwt', token);
    }

    retreive()
    {
        if (localStorage.getItem('jwt')) {
            return localStorage.getItem('jwt');
        }

        return null;
    }

    forget()
    {
        localStorage.removeItem('jwt');
    }
}

export default Local;