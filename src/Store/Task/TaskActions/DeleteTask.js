import * as TaskActionTypes from "../TaskActionTypes";
import { DeleteTask } from "../../../Storage/TaskStorage";

const failed = taskId => ({
    type: TaskActionTypes.TASK_DELETE_FAILED,
    payload: { taskId }
})

const completed = taskId => ({
    type: TaskActionTypes.TASK_DELETE_COMPLETE,
    payload: { taskId }
})

export default taskId => dispatch => {
    try {
        DeleteTask(taskId);
        dispatch(completed(taskId))
    } catch (error) {
        dispatch(failed(taskId))
    }
}