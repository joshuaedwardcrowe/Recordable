import { getSavedCollection } from "../../../Helpers/storageHelper";
import UnloadTasks from "../../Task/TaskActions/UnloadTasks"
import SaveTask from "../../Task/TaskActions/SaveTask"

const RECORDING_STORAGE_IDENTIFIER = "TODOAPP_RECORDING";
const AUDIT_STORAGE_IDENTIFIER = "TODOAPP_AUDITS";

const getRecording = recordingId => {
    const { recordings } = getSavedCollection(RECORDING_STORAGE_IDENTIFIER);
    return recordings.find(recording => recording.id === recordingId);
}

const getAuditsWithinRecordingTime = recording => {
    const recordingStartedDate = new Date(recording.started);
    const recordingEndedDate = new Date(recording.ended);

    const { audits } = getSavedCollection(AUDIT_STORAGE_IDENTIFIER);

    return audits.filter(({ actioned }) => {
        const actionedDate = new Date(actioned);
        return actionedDate > recordingStartedDate && actionedDate < recordingEndedDate;
    })
}

export default recordingId => dispatch => {
    const recording = getRecording(recordingId);
    const auditsWithinRecordingTime = getAuditsWithinRecordingTime(recording);

    if (!auditsWithinRecordingTime.length) return;
    dispatch(UnloadTasks())

    const interval = setInterval(() => {

        if (!auditsWithinRecordingTime.length) {
            clearInterval(interval);
            return;
        }

        const nextAudit = auditsWithinRecordingTime.shift();
        const dummyTask = { id: nextAudit.taskId, [nextAudit.fieldName]: nextAudit.oldValue }

        dispatch(SaveTask(dummyTask, nextAudit.fieldName, nextAudit.newValue))

    }, 1000)
}