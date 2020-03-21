import * as TaskActionTypes from "./TaskActionTypes"

const initialTaskState = {
    tasks: [],
    tasksLoading: false,
};

export default (state = initialTaskState, action) => {
    switch (action.type) {
        case TaskActionTypes.TASK_LOAD:
            return {
                ...state,
                tasksLoading: true,
            }
        case TaskActionTypes.TASK_LOAD_COMPLETE:
            return {
                ...state,
                tasks: action.payload.tasks,

            }
        case TaskActionTypes.TASK_LOAD_FAILED:
            return {
                ...state,
                tasksLoading: false,
            }
        case TaskActionTypes.TASK_UNLOAD:
            return {
                ...state,
                tasks: []
            }
        case TaskActionTypes.TASK_ADD_PREPARE:
            const mostRecentTask = state.tasks[state.tasks.length - 1]

            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    {
                        id: mostRecentTask ? mostRecentTask.id + 1 : 1,
                        name: null,
                        description: null,
                        created: new Date().toISOString()
                    }
                ]
            }
        case TaskActionTypes.TASK_ADD_UNPREPARE:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload.taskId),
            }
        case TaskActionTypes.TASK_SAVE_COMPLETE:
            const currentTasks = Array.from(state.tasks);
            const currentTask = currentTasks.find(task => task.id === action.payload.task.id);
            const indexOf = currentTasks.indexOf(currentTask);

            currentTasks.splice(indexOf, 1, action.payload.task)

            return {
                ...state,
                tasks: currentTasks
            }
        case TaskActionTypes.TASK_DELETE_COMPLETE:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload.taskId)
            }
        default:
            return state;
    }
};