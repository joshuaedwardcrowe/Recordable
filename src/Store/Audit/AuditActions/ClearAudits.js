import * as AuditActionTypes from "../AuditActionTypes";
import { updateSavedCollection } from "../../../Helpers/storageHelper";

const AUDIT_STORAGE_IDENTIFIER = "TODOAPP_AUDITS";

const failedClearingAudits = () => ({
    type: AuditActionTypes.AUDIT_CLEAR_FAILED
})

const completedClearingAudits = () => ({
    type: AuditActionTypes.AUDIT_CLEAR_COMPLETE
})

export default () => dispatch => {
    try {
        updateSavedCollection(AUDIT_STORAGE_IDENTIFIER, { audits: [] })
        dispatch(completedClearingAudits())
    } catch (error) {
        dispatch(failedClearingAudits())
    }
}