import * as TaskActionTypes from "../TaskActionTypes";
import { getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";

const TASK_STORAGE_IDENTIFIER = "TODOAPP_TASKS";

const beginLoadingSavedTasks = () => ({
    type: TaskActionTypes.TASK_LOAD
})

const completedLoadingSavedTasks = (tasks) => ({
    type: TaskActionTypes.TASK_LOAD_COMPLETE,
    payload: { tasks },
});

const failedLoadingSavedTasks = () => ({
    type: TaskActionTypes.TASK_LOAD_FAILED
})

export default () => dispatch => {
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