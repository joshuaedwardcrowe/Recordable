import * as TaskActionTypes from "../TaskActionTypes";
import { getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";

const TASK_STORAGE_IDENTIFIER = "TODOAPP_TASKS";

const failed = taskId => ({
    type: TaskActionTypes.TASK_DELETE_FAILED,
    payload: { taskId }
})

const completed = taskId => ({
    type: TaskActionTypes.TASK_DELETE_COMPLETE,
    payload: { taskId }
})

const deleteInCollection = taskId => {
    const taskContainer = getSavedCollection(TASK_STORAGE_IDENTIFIER);
    taskContainer.tasks = taskContainer.tasks.filter(({ id }) => id !== taskId);
    updateSavedCollection(TASK_STORAGE_IDENTIFIER, taskContainer);
}

export default taskId => dispatch => {
    try {
        deleteInCollection(taskId);
        dispatch(completed(taskId))
    } catch (error) {
        dispatch(failed(taskId))
    }
}