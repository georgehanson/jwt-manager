class Local
{
    set(token)
    {
        localStorage.setItem('jwt', token);
    }

    get()
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