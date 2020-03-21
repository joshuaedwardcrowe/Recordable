import { RECORDING_COLLECTION, AUDIT_COLLECTION, getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";
import { CalculateMillisecondTimeDifference } from "../../../Helpers/timeHelper"
import UnloadTasks from "../../Task/TaskActions/UnloadTasks"
import SaveTask from "../../Task/TaskActions/SaveTask"

const updateStoppedStatus = recordingId => {
    const recordingContainer = getSavedCollection(RECORDING_COLLECTION);
    const existingRecording = recordingContainer.recordings.find(recording => recording.id === recordingId);
    const otherRecordings = recordingContainer.recordings.filter(x => x.id !== existingRecording.id);

    existingRecording.stopped = false;
    recordingContainer.recordings = [...otherRecordings, existingRecording]

    updateSavedCollection(RECORDING_COLLECTION, recordingContainer);
    return existingRecording;
}

const getRecording = recordingId => {
    const { recordings } = getSavedCollection(RECORDING_COLLECTION);
    return recordings.find(recording => recording.id === recordingId);
}

const getAudits = auditIds => {
    const { audits } = getSavedCollection(AUDIT_COLLECTION);
    return audits.filter(audit => auditIds.includes(audit.id));
}

const applyAudits = (recording, audits, dispatch) => {

    const differenceInMilliseconds = CalculateMillisecondTimeDifference(recording.started, recording.ended) * 1000;
    const timeout = differenceInMilliseconds / audits.length;

    const interval = setInterval(() => {

        // Step 1: Get the current recording in this interval.
        const currentRecording = getRecording(recording.id);

        if (!currentRecording || currentRecording.stopped) {
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

    }, timeout)
}

export default recordingId => dispatch => {

    // Step 1.2: Ensure the recording isnt stopped.
    updateStoppedStatus(recordingId);

    // Step 1: Get this recording. 
    const recording = getRecording(recordingId);

    // Step 2: Get all audits currently saved audits with these IDs.
    const audits = getAudits(recording.auditIds);

    // Step 3: If there are no audits, end the action.
    if (!audits.length) return;

    // Step 4: If there are audits, we clear redux's Task state so we can see it appear.
    dispatch(UnloadTasks());

    applyAudits(recording, audits, dispatch);

}