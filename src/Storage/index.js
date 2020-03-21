export const getContainer = (key) => {
    const serialized = window.localStorage.getItem(key);
    return JSON.parse(serialized);
}

export const updateContainer = (key, value) => {
    const deserialized = JSON.stringify(value);
    window.localStorage.setItem(key, deserialized);
}