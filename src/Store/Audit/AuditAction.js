import * as AuditActionTypes from "./AuditActionTypes";
import { getSavedCollection, updateSavedCollection } from "../../Helpers/storageHelper";

const AUDIT_STORAGE_IDENTIFIER = "TODOAPP_AUDITS";

export const beginLoadingSavedAudits = () => ({
    type: AuditActionTypes.AUDIT_LOAD
});

export const completedLoadingSavedAudits = audits => ({
    type: AuditActionTypes.AUDIT_LOAD_COMPLETE,
    payload: { audits }
})

export const failedLoadingSavedAudits = audits => ({
    type: AuditActionTypes.AUDIT_LOAD_FAILED
})

export const loadSavedAudits = () => dispatch => {
    dispatch(beginLoadingSavedAudits());

    try {

        const { audits } = getSavedCollection(AUDIT_STORAGE_IDENTIFIER);

        if (audits.length) {
            dispatch(completedLoadingSavedAudits(audits))
        } else {
            dispatch(failedLoadingSavedAudits())
        }

    } catch (error) {

        updateSavedCollection(AUDIT_STORAGE_IDENTIFIER, { audits: [] })

    }
}

const updateAuditCollection = (task, fieldName, newValue) => {
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

const completedSavingAudit = audit => ({
    type: AuditActionTypes.AUDIT_SAVE_COMPLETE,
    payload: { audit }
})

const failedSavingAudit = audit => ({
    type: AuditActionTypes.AUDIT_SAVE_FAILED,
    payload: { audit }
})

export const saveAudit = (task, fieldName, newValue) => dispatch => {
    try {

        const savedAudit = updateAuditCollection(task, fieldName, newValue);

        dispatch(completedSavingAudit(savedAudit))

    } catch (error) {

        dispatch(failedSavingAudit(task))

    }
}

const failedClearingAudits = () => ({
    type: AuditActionTypes.AUDIT_CLEAR_FAILED
})

const completedClearingAudits = () => ({
    type: AuditActionTypes.AUDIT_CLEAR_COMPLETE
})

export const clearAudits = () => dispatch => {
    try {
        updateSavedCollection(AUDIT_STORAGE_IDENTIFIER, { audits: [] })
        dispatch(completedClearingAudits())
    } catch (error) {
        dispatch(failedClearingAudits())
    }
}

