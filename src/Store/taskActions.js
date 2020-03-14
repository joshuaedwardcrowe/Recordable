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

export const saveTask = () => dispatch => {
    let savedTasks = window.localStorage.get(TASK_STORAGE_IDENTIFIER);

    if (savedTasks && savedTasks.length) {

    }
}

export const markTaskAsSelected = taskId => ({
    type: keys.TASK_MARK,
    payload: { taskId }
});

export const unmarkTaskAsSelected = taskId => ({
    type: keys.TASK_UNMARK,
    payload: { taskId }
});

export const markRecordingAsSelected = recordingId => ({
    type: keys.RECORDING_MARK,
    payload: { recordingId }
});

export const unmarkRecordingAsSelected = recordingId => ({
    type: keys.RECORDING_UNMARK,
    payload: { recordingId }
});

export const playRecording = recordingId => ({
    type: keys.RECORDING_PLAY,
    payload: { recordingId },
});

