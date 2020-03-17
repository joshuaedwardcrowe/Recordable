import * as TaskActionTypes from "./TaskActionTypes";

export const unprepareToAddTask = taskId => ({
    type: TaskActionTypes.TASK_ADD_UNPREPARE,
    payload: { taskId }
})
