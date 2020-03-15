import * as AuditActionTypes from "./AuditActionTypes";

const initialAuditState = {
    audits: [],
    auditsLoading: false,
}

export const AuditReducer = (state = initialAuditState, action) => {
    switch (action.type) {
        case AuditActionTypes.AUDIT_LOAD:
            return {
                ...state,
                auditsLoading: true,
            }
        case AuditActionTypes.AUDIT_LOAD_COMPLETE:
            return {
                ...state,
                tasks: action.payload.tasks,

            }
        case AuditActionTypes.AUDIT_LOAD_FAILED:
            return {
                ...state,
                tasksLoading: false,
            }
        default:
            return state;
    }
}

export default AuditReducer;