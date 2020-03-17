import * as AuditActionTypes from "../AuditActionTypes";
import { getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";

const AUDIT_STORAGE_IDENTIFIER = "TODOAPP_AUDITS";

export const begin = () => ({
    type: AuditActionTypes.AUDIT_LOAD
});

export const completed = audits => ({
    type: AuditActionTypes.AUDIT_LOAD_COMPLETE,
    payload: { audits }
})

export const failed = audits => ({
    type: AuditActionTypes.AUDIT_LOAD_FAILED
})

export default () => dispatch => {
    dispatch(begin());

    try {
        const { audits } = getSavedCollection(AUDIT_STORAGE_IDENTIFIER);

        if (audits.length) {
            dispatch(completed(audits))
        } else {
            dispatch(failed())
        }
    } catch (error) {
        updateSavedCollection(AUDIT_STORAGE_IDENTIFIER, { audits: [] })
        dispatch(failed())
    }
}