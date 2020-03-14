export const getSavedCollection = (key) => {
    const serialized = window.localStorage.getItem(key);
    return JSON.parse(serialized);
}

export const updateSavedCollection = (key, value) => {
    const deserialized = JSON.stringify(value);
    window.localStorage.setItem(key, deserialized);
}