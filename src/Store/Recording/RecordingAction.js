import * as RecordingActionTypes from "./RecordingActionTypes";
import { getSavedCollection, updateSavedCollection } from "../../Helpers/storageHelper";
import UnloadTasks from "../Task/TaskActions/UnloadTasks"
import SaveTask from "../Task/TaskActions/SaveTask"

const RECORDING_STORAGE_IDENTIFIER = "TODOAPP_RECORDING";
const AUDIT_STORAGE_IDENTIFIER = "TODOAPP_AUDITS";

export const playingRecording = recordingId => ({
    type: RecordingActionTypes.RECORDING_PLAYING,
    payload: { recordingId }
})


export const playRecording = recordingId => dispatch => {
    const { recordings } = getSavedCollection(RECORDING_STORAGE_IDENTIFIER);
    const recording = recordings.find(x => x.id === recordingId);

    const recordingStartedDate = new Date(recording.started);
    const recordingEndedDate = new Date(recording.ended);

    const { audits } = getSavedCollection(AUDIT_STORAGE_IDENTIFIER);

    const auditsWithinRecording = audits.filter(({ actioned }) => {
        const actionedDate = new Date(actioned);
        return actionedDate > recordingStartedDate && actionedDate < recordingEndedDate;
    })

    if (auditsWithinRecording.length) {
        dispatch(UnloadTasks())

        const interval = setInterval(() => {

            if (!auditsWithinRecording.length) {
                clearInterval(interval);
                return;
            }

            const nextAudit = auditsWithinRecording.shift();
            const dummyTask = { id: nextAudit.taskId, [nextAudit.fieldName]: nextAudit.oldValue }

            dispatch(SaveTask(dummyTask, nextAudit.fieldName, nextAudit.newValue))

        }, 1000)
    }
}

const failedDeletingRecordingInCollection = recordingId => ({
    type: RecordingActionTypes.RECORDING_DELETE_FAILED,
    payload: { recordingId }
})

const completedDeletingRecordInCollection = recordingId => ({
    type: RecordingActionTypes.RECORDING_DELETE_COMPLETE,
    payload: { recordingId }
})

const deleteRecordingInCollection = recordingId => {
    const recordingContainer = getSavedCollection(RECORDING_STORAGE_IDENTIFIER);
    recordingContainer.recordings = recordingContainer.recordings.filter(({ id }) => id !== recordingId);
    updateSavedCollection(RECORDING_STORAGE_IDENTIFIER, recordingContainer);
}

export const deleteRecording = recordingId => dispatch => {
    try {

        deleteRecordingInCollection(recordingId);

        dispatch(completedDeletingRecordInCollection(recordingId))

    } catch (error) {

        dispatch(failedDeletingRecordingInCollection(recordingId))
    }
}