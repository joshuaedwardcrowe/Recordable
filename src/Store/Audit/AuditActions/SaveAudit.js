import * as AuditActionTypes from "../AuditActionTypes";
import { getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";

const AUDIT_STORAGE_IDENTIFIER = "TODOAPP_AUDITS";

const addToCollection = (task, fieldName, newValue) => {
    const auditContainer = getSavedCollection(AUDIT_STORAGE_IDENTIFIER);

    const audit = {
        taskId: task.id,
        fieldName,
        oldValue: task[fieldName],
        newValue,
        actioned: new Date().toISOString()
    };

    auditContainer.audits.push(audit);

    updateSavedCollection(AUDIT_STORAGE_IDENTIFIER, auditContainer);

    return audit;
}

const completed = audit => ({
    type: AuditActionTypes.AUDIT_SAVE_COMPLETE,
    payload: { audit }
})

const failed = audit => ({
    type: AuditActionTypes.AUDIT_SAVE_FAILED,
    payload: { audit }
})

export default (task, fieldName, newValue) => dispatch => {
    try {

        const savedAudit = addToCollection(task, fieldName, newValue);

        dispatch(completed(savedAudit))

    } catch (error) {

        dispatch(failed(task))

    }
}