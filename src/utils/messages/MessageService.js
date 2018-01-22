export function getFromStorage(key) {
    return localStorage.getItem(key);
}

export function setInStorage(key, value) {
    localStorage.setItem(key, value);
}

export function removeFromStorate(key) {
    return localStorage.removeItem(key);
}

export function existInStorage(key) {
    return !(getFromStorage(key) === null);
}

export function isTrue(key) {
    return getFromStorage(key) === '1';
}

export function isFalse(key) {
    return getFromStorage(key) === '0';
}

export const handleDismiss = (key) => {
    localStorage.setItem(key, '0');
};

export const handleShowMessage = (key) => {
    localStorage.setItem(key, '1');
};