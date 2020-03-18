import * as AuditActionTypes from "../AuditActionTypes";
import { AUDIT_COLLECTION, updateSavedCollection } from "../../../Helpers/storageHelper";

const completed = () => ({
    type: AuditActionTypes.AUDIT_CLEAR_COMPLETE
})

const failed = () => ({
    type: AuditActionTypes.AUDIT_CLEAR_FAILED
})

export default () => dispatch => {
    try {
        updateSavedCollection(AUDIT_COLLECTION, { audits: [] })
        dispatch(completed())
    } catch (error) {
        dispatch(failed())
    }
}