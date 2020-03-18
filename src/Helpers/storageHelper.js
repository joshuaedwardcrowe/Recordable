export const TASK_COLLECTION = "TODOAPP_TASK";
export const RECORDING_COLLECTION = "TODOAPP_RECORDING";
export const AUDIT_COLLECTION = "TODOAPP_AUDIT";

export const getSavedCollection = (key) => {
    const serialized = window.localStorage.getItem(key);
    return JSON.parse(serialized);
}

export const updateSavedCollection = (key, value) => {
    const deserialized = JSON.stringify(value);
    window.localStorage.setItem(key, deserialized);
}