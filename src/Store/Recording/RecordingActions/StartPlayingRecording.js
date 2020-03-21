import { RECORDING_COLLECTION, AUDIT_COLLECTION, getSavedCollection } from "../../../Helpers/storageHelper";
import UnloadTasks from "../../Task/TaskActions/UnloadTasks"
import SaveTask from "../../Task/TaskActions/SaveTask"

const getRecording = recordingId => {
    const { recordings } = getSavedCollection(RECORDING_COLLECTION);
    return recordings.find(recording => recording.id === recordingId);
}

const getAudits = auditIds => {
    const { audits } = getSavedCollection(AUDIT_COLLECTION);
    return audits.filter(audit => auditIds.includes(audit.id));
}

const applyAudits = (recordingId, audits, dispatch) => {
    const interval = setInterval(() => {

        // Step 1: Get the current recording in this interval.
        const recording = getRecording(recordingId);

        if (!recording || recording.stopped) {
            clearInterval(interval);
            return;
        }

        if (!audits.length) {
            clearInterval(interval);
            return;
        }

        const { taskId, fieldName, oldValue, newValue } = audits.shift();
        const task = { id: taskId, [fieldName]: oldValue }

        dispatch(SaveTask(task, fieldName, newValue));

    }, 1000)
}

export default recordingId => dispatch => {

    // Step 1: Get this recording. 
    const recording = getRecording(recordingId);

    // Step 2: Get all audits currently saved audits with these IDs.
    const audits = getAudits(recording.auditIds);

    // Step 3: If there are no audits, end the action.
    if (!audits.length) return;

    // Step 4: If there are audits, we clear redux's Task state so we can see it appear.
    dispatch(UnloadTasks());

    applyAudits(recordingId, audits, dispatch);

}