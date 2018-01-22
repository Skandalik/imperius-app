const TOKEN_KEY = 'token';

export function getToken() {
    console.log(localStorage.getItem(TOKEN_KEY));
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(token) {
    return localStorage.removeItem(TOKEN_KEY);
}

export function isLogged() {
    return !(getToken() === null);
}