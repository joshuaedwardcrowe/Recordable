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
                audits: action.payload.audits,

            }
        case AuditActionTypes.AUDIT_LOAD_FAILED:
            return {
                ...state,
                auditsLoading: false,
            }
        case AuditActionTypes.AUDIT_SAVE_COMPLETE: {
            return {
                ...state,
                audits: [...state.audits, action.payload.audit]
            }
        }
        case AuditActionTypes.AUDIT_CLEAR_COMPLETE: {
            return {
                ...state,
                audits: [],
            }
        }
        default:
            return state;
    }
}

export default AuditReducer;