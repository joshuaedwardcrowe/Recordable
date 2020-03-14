import * as keys from "./keys";
import { getSavedCollection, updateSavedCollection } from "../Helpers/storageHelper";

const TASK_STORAGE_IDENTIFIER = "TODOAPP_TASKS";


export const beginLoadingSavedTasks = () => ({
    type: keys.TASK_LOAD
})

export const completedLoadingSavedTasks = (tasks) => ({
    type: keys.TASK_LOAD_COMPLETE,
    payload: { tasks },
});

export const failedLoadingSavedTasks = () => ({
    type: keys.TASK_LOAD_FAILED
})

export const loadSavedTasks = () => dispatch => {
    dispatch(beginLoadingSavedTasks())

    try {

        const { tasks } = getSavedCollection(TASK_STORAGE_IDENTIFIER)

        if (tasks.length) {
            dispatch(completedLoadingSavedTasks(tasks));
        } else {
            dispatch(failedLoadingSavedTasks())
        }

    } catch (error) {

        updateSavedCollection(TASK_STORAGE_IDENTIFIER, { tasks: [] })
        dispatch(failedLoadingSavedTasks())
        
    }

}

export const prepareToAddTask = () => ({
    type: keys.TASK_ADD_PREPARE
})

export const completedAddingTask = task => ({
    type: keys.TASK_ADD_COMPLETE,
    payload: { task }
})

export const failedAddingTask = task => ({
    type: keys.TASK_ADD_FAILED,
    payload: { task }
})

export const addTask = task => dispatch => {
    try {

        const collection = getSavedCollection(TASK_STORAGE_IDENTIFIER);

        collection.tasks.push(task);

        updateSavedCollection(TASK_STORAGE_IDENTIFIER, collection);

        dispatch(completedAddingTask(task));

    } catch (error) {

        dispatch(failedAddingTask(task));

    }
}



























// export const saveTask = () => dispatch => {
//     let savedTasks = window.localStorage.get(TASK_STORAGE_IDENTIFIER);

//     if (savedTasks && savedTasks.length) {

//     }
// }\

export const playRecording = recordingId => ({
    type: keys.RECORDING_PLAY,
    payload: { recordingId },
});

