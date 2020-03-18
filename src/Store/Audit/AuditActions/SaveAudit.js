import * as AuditActionTypes from "../AuditActionTypes";
import { AUDIT_COLLECTION, getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";

const addToCollection = (task, fieldName, newValue) => {
    const auditContainer = getSavedCollection(AUDIT_COLLECTION);

    const audit = {
        taskId: task.id,
        fieldName,
        oldValue: task[fieldName],
        newValue,
        actioned: new Date().toISOString()
    };

    auditContainer.audits.push(audit);

    updateSavedCollection(AUDIT_COLLECTION, auditContainer);

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