import * as AuditActionTypes from "../AuditActionTypes";
import { AUDIT_COLLECTION, getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";

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
        const { audits } = getSavedCollection(AUDIT_COLLECTION);

        if (audits.length) {
            dispatch(completed(audits))
        } else {
            dispatch(failed())
        }
    } catch (error) {
        updateSavedCollection(AUDIT_COLLECTION, { audits: [] })
        dispatch(failed())
    }
}