import * as AuditActionTypes from "../AuditActionTypes";
import { RECORDING_COLLECTION, AUDIT_COLLECTION, getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";
import AssociateAudit from "../../Recording/RecordingActions/AssociateAudit"

const addToCollection = (task, fieldName, newValue) => {
    const auditContainer = getSavedCollection(AUDIT_COLLECTION);
    const latestAudit = auditContainer.audits[auditContainer.audits.length - 1]

    const audit = {
        id: latestAudit ? latestAudit.id + 1 : 1,
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

const getActiveRecordings = () => {
    const { recordings } = getSavedCollection(RECORDING_COLLECTION);
    return recordings.filter(recording => !recording.ended)
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
        const activeRecordings = getActiveRecordings();

        for (let recording of activeRecordings) {
            dispatch(AssociateAudit(recording, savedAudit.id))
        }

        dispatch(completed(savedAudit))

    } catch (error) {

        dispatch(failed(task))

    }
}