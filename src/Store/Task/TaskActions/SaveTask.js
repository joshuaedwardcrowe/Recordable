import * as TaskActionTypes from "../TaskActionTypes";
import { AddOrUpdateTask } from "../../../Helpers/Storage/TaskStorage";
import SaveAudit from "../../Audit/AuditActions/SaveAudit";

const completed = task => ({
    type: TaskActionTypes.TASK_SAVE_COMPLETE,
    payload: { task }
})

const failed = task => ({
    type: TaskActionTypes.TASK_SAVE_FAILED,
    payload: { task }
})

export default (task, fieldName, newValue) => dispatch => {
    try {
        const savedTask = AddOrUpdateTask(task, fieldName, newValue);

        dispatch(SaveAudit(task, fieldName, newValue))
        dispatch(completed(savedTask))
    } catch (error) {
        dispatch(failed(task))
    }
}