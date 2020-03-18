import * as RecordingActionTypes from "../RecordingActionTypes";
import { RECORDING_COLLECTION, getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";
import { CalculateDateReached } from "../../../Helpers/timeHelper";

const updateEndedDate = (recording, millisecondsRecorded) => {
    const recordingContainer = getSavedCollection(RECORDING_COLLECTION);
    const existingRecording = recordingContainer.recordings.find(({ id }) => recording.id === id);
    const otherRecordings = recordingContainer.recordings.filter(x => x.id !== existingRecording.id);

    var timeReached = CalculateDateReached(existingRecording.started, millisecondsRecorded);
    existingRecording.ended = timeReached.toISOString();
    recordingContainer.recordings = [...otherRecordings, existingRecording]

    updateSavedCollection(RECORDING_COLLECTION, recordingContainer);
    return existingRecording;
}

const completed = recording => ({
    type: RecordingActionTypes.RECORDING_STOP_COMPLETE,
    payload: { recording }
})

const failed = () => ({
    type: RecordingActionTypes.RECORDING_STOP_FAILED,
})

export default (recording, millisecondsRecorded) => dispatch => {
    try {

        const updatedRecording = updateEndedDate(recording, millisecondsRecorded);

        dispatch(completed(updatedRecording))

    } catch (error) {
        dispatch(failed())
    }
}