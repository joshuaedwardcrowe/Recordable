import * as TaskActionTypes from "./TaskActionTypes";

export const unloadDisplayingTasks = () => ({
    type: TaskActionTypes.TASK_UNLOAD
})

export const prepareToAddTask = () => ({
    type: TaskActionTypes.TASK_ADD_PREPARE
})

export const unprepareToAddTask = taskId => ({
    type: TaskActionTypes.TASK_ADD_UNPREPARE,
    payload: { taskId }
})
