import * as RecordingActionTypes from "./RecordingActionTypes";
import { getSavedCollection, updateSavedCollection } from "../../Helpers/storageHelper";

const RECORDING_STORAGE_IDENTIFIER = "TODOAPP_RECORDING";

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

const addRecordingToCollection = recording => {
    const recordingContainer = getSavedCollection(RECORDING_STORAGE_IDENTIFIER);
    const existingRecording = recordingContainer.recordings.find(({ id }) => recording.id === id);

    if (!existingRecording) {
        recording.ended = new Date().toISOString();
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

export const stopRecording = recording => dispatch => {
    try {

        const addedRecording = addRecordingToCollection(recording);

        if (addedRecording !== null) {
            dispatch(completedSavingRecording())
        } else {
            dispatch(failedSavingRecording())
        }

    } catch (error) {
        dispatch(failedSavingRecording())
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