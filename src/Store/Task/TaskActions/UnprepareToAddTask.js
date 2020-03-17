import * as TaskActionTypes from "../TaskActionTypes";

export default taskId => ({
    type: TaskActionTypes.TASK_ADD_UNPREPARE,
    payload: { taskId }
})