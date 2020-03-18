import * as TaskActionTypes from "../TaskActionTypes";
import { TASK_COLLECTION, getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";

const failed = taskId => ({
    type: TaskActionTypes.TASK_DELETE_FAILED,
    payload: { taskId }
})

const completed = taskId => ({
    type: TaskActionTypes.TASK_DELETE_COMPLETE,
    payload: { taskId }
})

const deleteInCollection = taskId => {
    const taskContainer = getSavedCollection(TASK_COLLECTION);
    taskContainer.tasks = taskContainer.tasks.filter(({ id }) => id !== taskId);
    updateSavedCollection(TASK_COLLECTION, taskContainer);
}

export default taskId => dispatch => {
    try {
        deleteInCollection(taskId);
        dispatch(completed(taskId))
    } catch (error) {
        dispatch(failed(taskId))
    }
}