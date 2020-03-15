import * as RecordingActionTypes from "./RecordingActionTypes";
import { getSavedCollection, updateSavedCollection } from "../../Helpers/storageHelper";

const RECORDING_STORAGE_IDENTIFIER = "TODOAPP_RECORDING";

export const beginLoadingSavedRecordings = () => ({
    type: RecordingActionTypes.RECORDING_LOAD,
});

export const completedLoadingSavedAudits = recordings => ({
    type: RecordingActionTypes.RECORDING_LOAD_COMPLETE,
    payload: { recordings }
})

export const failedLoadingSavedRecordings = () => ({
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

export const completedSavingRecording = recording => ({
    type: RecordingActionTypes.RECORDING_SAVE_COMPLETE,
    payload: { recording }
})

export const failedSavingRecording = recording => ({
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