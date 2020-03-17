import * as TaskActionTypes from "../TaskActionTypes";
import { getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";
import { saveAudit } from "../../Audit/AuditAction";

const TASK_STORAGE_IDENTIFIER = "TODOAPP_TASKS";

const completedSavingTask = task => ({
    type: TaskActionTypes.TASK_SAVE_COMPLETE,
    payload: { task }
})

const failedSavingTask = task => ({
    type: TaskActionTypes.TASK_SAVE_FAILED,
    payload: { task }
})

const updateTaskInCollection = (task, fieldName, newValue) => {
    const taskContainer = getSavedCollection(TASK_STORAGE_IDENTIFIER);
    const existingTask = taskContainer.tasks.find(({ id }) => task.id === id);

    if (!existingTask) {
        task.created = new Date().toISOString()
        task[fieldName] = newValue;
        taskContainer.tasks.push(task);
        updateSavedCollection(TASK_STORAGE_IDENTIFIER, taskContainer);
        return task;
    }

    existingTask[fieldName] = newValue;
    updateSavedCollection(TASK_STORAGE_IDENTIFIER, taskContainer);

    return existingTask;
}

export default (task, fieldName, newValue) => dispatch => {
    try {

        const savedTask = updateTaskInCollection(task, fieldName, newValue);

        dispatch(saveAudit(task, fieldName, newValue))

        dispatch(completedSavingTask(savedTask))

    } catch (error) {

        dispatch(failedSavingTask(task))

    }
}