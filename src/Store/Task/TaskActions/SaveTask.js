import * as TaskActionTypes from "../TaskActionTypes";
import { TASK_COLLECTION, getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";
import SaveAudit from "../../Audit/AuditActions/SaveAudit";

const completed = task => ({
    type: TaskActionTypes.TASK_SAVE_COMPLETE,
    payload: { task }
})

const failed = task => ({
    type: TaskActionTypes.TASK_SAVE_FAILED,
    payload: { task }
})

const addToCollection = (task, fieldName, newValue) => {
    const taskContainer = getSavedCollection(TASK_COLLECTION);
    const existingTask = taskContainer.tasks.find(({ id }) => task.id === id);

    if (!existingTask) {
        task.created = new Date().toISOString()
        task[fieldName] = newValue;
        taskContainer.tasks.push(task);
        updateSavedCollection(TASK_COLLECTION, taskContainer);
        return task;
    }

    existingTask[fieldName] = newValue;
    updateSavedCollection(TASK_COLLECTION, taskContainer);

    return existingTask;
}

export default (task, fieldName, newValue) => dispatch => {
    try {
        const savedTask = addToCollection(task, fieldName, newValue);

        dispatch(SaveAudit(task, fieldName, newValue))
        dispatch(completed(savedTask))
    } catch (error) {
        dispatch(failed(task))
    }
}