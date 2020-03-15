import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk";

import * as keys from "./keys";
import AuditReducer from "./Audit/AuditReducer";

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
        default:
            return state;
    }
};


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({ taskState: reduce, auditState: AuditReducer })

export default createStore(
    combinedReducers,
    composeEnhancers(applyMiddleware(thunk)))