import * as TaskActionTypes from "../TaskActionTypes";
import { getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";

const TASK_STORAGE_IDENTIFIER = "TODOAPP_TASKS";

const failedDeletingTaskInCollection = taskId => ({
    type: TaskActionTypes.TASK_DELETE_FAILED,
    payload: { taskId }
})

const completedDeletingInCollection = taskId => ({
    type: TaskActionTypes.TASK_DELETE_COMPLETE,
    payload: { taskId }
})

const deleteTaskInCollection = taskId => {
    const taskContainer = getSavedCollection(TASK_STORAGE_IDENTIFIER);

    taskContainer.tasks = taskContainer.tasks.filter(({ id }) => id !== taskId);

    updateSavedCollection(TASK_STORAGE_IDENTIFIER, taskContainer);
}

export default taskId => dispatch => {
    try {

        deleteTaskInCollection(taskId);

        dispatch(completedDeletingInCollection(taskId))

    } catch (error) {

        dispatch(failedDeletingTaskInCollection(taskId))
    }

}