import * as RecordingActionTypes from "./RecordingActionTypes";
import { getSavedCollection, updateSavedCollection } from "../../Helpers/storageHelper";
import { CalculateDateReached } from "../../Helpers/timeHelper";
import UnloadTasks from "../Task/TaskActions/UnloadTasks"
import SaveTask from "../Task/TaskActions/SaveTask"

const RECORDING_STORAGE_IDENTIFIER = "TODOAPP_RECORDING";
const AUDIT_STORAGE_IDENTIFIER = "TODOAPP_AUDITS";

const addRecordingToCollection = (recording, millisecondsRecorded) => {
    const recordingContainer = getSavedCollection(RECORDING_STORAGE_IDENTIFIER);
    const existingRecording = recordingContainer.recordings.find(({ id }) => recording.id === id);

    if (!existingRecording) {
        var timeReached = CalculateDateReached(recording.started, millisecondsRecorded);
        recording.ended = timeReached.toISOString();
        recordingContainer.recordings.push(recording);
        updateSavedCollection(RECORDING_STORAGE_IDENTIFIER, recordingContainer);
        return recording;
    }
}

const completedSavingRecording = recording => ({
    type: RecordingActionTypes.RECORDING_SAVE_COMPLETE,
    payload: { recording }
})

const failedSavingRecording = recording => ({
    type: RecordingActionTypes.RECORDING_SAVE_FAILED,
    payload: { recording }
})

export const stopRecording = (recording, millisecondsRecorded) => dispatch => {
    try {

        const addedRecording = addRecordingToCollection(recording, millisecondsRecorded);

        if (addedRecording !== null) {
            dispatch(completedSavingRecording())
        } else {
            dispatch(failedSavingRecording())
        }

    } catch (error) {
        dispatch(failedSavingRecording())
    }
}

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