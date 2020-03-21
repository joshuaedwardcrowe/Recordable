import * as RecordingActionTypes from "../RecordingActionTypes";
import { RECORDING_COLLECTION, getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";

const updateStoppedStatus = recordingId => {
    const recordingContainer = getSavedCollection(RECORDING_COLLECTION);
    const existingRecording = recordingContainer.recordings.find(recording => recording.id === recordingId);
    const otherRecordings = recordingContainer.recordings.filter(x => x.id !== existingRecording.id);

    existingRecording.stopped = true;
    recordingContainer.recordings = [...otherRecordings, existingRecording]

    updateSavedCollection(RECORDING_COLLECTION, recordingContainer);
    return existingRecording;
}

const completed = recording => ({
    type: RecordingActionTypes.RECORDING_STOP_PLAYING_COMPLETE,
    payload: { recording }
})

const failed = () => ({
    type: RecordingActionTypes.RECORDING_STOP_PLAYING_FAILED,
})

export default recordingId => dispatch => {
    try {

        const updatedRecording = updateStoppedStatus(recordingId);

        dispatch(completed(updatedRecording))

    } catch (error) {
        dispatch(failed())
    }
}