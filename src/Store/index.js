import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk";

import TaskReducer from "./Task/TaskReducer";
import AuditReducer from "./Audit/AuditReducer";
import RecordingReducer from "./Recording/RecordingReducer";



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
    taskState: TaskReducer,
    auditState: AuditReducer,
    recordingState: RecordingReducer
})

export default createStore(
    combinedReducers,
    composeEnhancers(applyMiddleware(thunk)))