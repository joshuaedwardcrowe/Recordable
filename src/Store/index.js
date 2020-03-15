import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk";

import * as keys from "./keys";
import AuditReducer from "./Audit/AuditReducer";
import RecordingReducer from "./Recording/RecordingReducer";

const initialTaskState = {
    tasks: [],
    tasksLoading: false,
    recordings: [],
    recordingsLoaded: false,
};

// TODO: Abstract
export const reduce = (state = initialTaskState, action) => {
    switch (action.type) {
        case keys.TASK_LOAD:
            return {
                ...state,
                tasksLoading: true,
            }
        case keys.TASK_LOAD_COMPLETE:
            return {
                ...state,
                tasks: action.payload.tasks,

            }
        case keys.TASK_LOAD_FAILED:
            return {
                ...state,
                tasksLoading: false,
            }
        case keys.TASK_ADD_PREPARE:
            const mostRecentTask = state.tasks[state.tasks.length - 1]

            return {
                ...state,
                tasks: [...state.tasks, { id: mostRecentTask ? mostRecentTask.id + 1 : 1 }]
            }
        case keys.TASK_ADD_UNPREPARE:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload.taskId),
            }
        case keys.TASK_SAVE_COMPLETE:
            const currentTasks = Array.from(state.tasks);
            const currentTask = currentTasks.find(task => task.id === action.payload.task.id);
            const indexOf = currentTasks.indexOf(currentTask);

            currentTasks.splice(indexOf, 1, action.payload.task)

            return {
                ...state,
                tasks: currentTasks
            }
        default:
            return state;
    }
};


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
    taskState: reduce,
    auditState: AuditReducer,
    recordingState: RecordingReducer
})

export default createStore(
    combinedReducers,
    composeEnhancers(applyMiddleware(thunk)))