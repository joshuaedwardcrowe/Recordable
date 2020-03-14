import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk";

import * as keys from "./keys";

const initialState = {
    tasks: [],
    tasksLoading: false,
    actions: [],
    actionsLoading: false,
    recordings: [],
    recordingsLoaded: false,
};

export const reduce = (state = initialState, action) => {
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
        default:
            return state;
    }
};


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    reduce, 
    composeEnhancers(applyMiddleware(thunk)));