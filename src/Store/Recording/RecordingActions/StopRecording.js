import * as RecordingActionTypes from "../RecordingActionTypes";
import { RECORDING_COLLECTION, getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";
import { CalculateDateReached } from "../../../Helpers/timeHelper";

const addRecordingToCollection = (recording, millisecondsRecorded) => {
    const recordingContainer = getSavedCollection(RECORDING_COLLECTION);
    const existingRecording = recordingContainer.recordings.find(({ id }) => recording.id === id);

    if (!existingRecording) {
        var timeReached = CalculateDateReached(recording.started, millisecondsRecorded);
        recording.ended = timeReached.toISOString();
        recordingContainer.recordings.push(recording);
        updateSavedCollection(RECORDING_COLLECTION, recordingContainer);
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

export default (recording, millisecondsRecorded) => dispatch => {
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