import * as RecordingActionTypes from "./RecordingActionTypes";
import { getSavedCollection, updateSavedCollection } from "../../Helpers/storageHelper";
import { CalculateDateReached } from "../../Helpers/timeHelper";
import { unloadDisplayingTasks, saveTask } from "../Task/TaskAction"

const RECORDING_STORAGE_IDENTIFIER = "TODOAPP_RECORDING";
const AUDIT_STORAGE_IDENTIFIER = "TODOAPP_AUDITS";

const beginLoadingSavedRecordings = () => ({
    type: RecordingActionTypes.RECORDING_LOAD,
});

const completedLoadingSavedAudits = recordings => ({
    type: RecordingActionTypes.RECORDING_LOAD_COMPLETE,
    payload: { recordings }
})

const failedLoadingSavedRecordings = () => ({
    type: RecordingActionTypes.RECORDING_LOAD_FAILED
})

export const loadSavedRecordings = () => dispatch => {
    dispatch(beginLoadingSavedRecordings());

    try {

        const { recordings } = getSavedCollection(RECORDING_STORAGE_IDENTIFIER);

        if (recordings.length) {
            dispatch(completedLoadingSavedAudits(recordings))
        } else {
            dispatch(failedLoadingSavedRecordings())
        }

    } catch (error) {

        updateSavedCollection(RECORDING_STORAGE_IDENTIFIER, { recordings: [] })
        dispatch(failedLoadingSavedRecordings())

    }
}

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

export const startRecording = () => ({
    type: RecordingActionTypes.RECORDING_START
})

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
        dispatch(unloadDisplayingTasks())

        const interval = setInterval(() => {

            if (!auditsWithinRecording.length) {
                clearInterval(interval);
                return;
            }

            const nextAudit = auditsWithinRecording.shift();
            const dummyTask = { id: nextAudit.taskId, [nextAudit.fieldName]: nextAudit.oldValue }

            dispatch(saveTask(dummyTask, nextAudit.fieldName, nextAudit.newValue))

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