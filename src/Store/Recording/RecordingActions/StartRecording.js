import * as RecordingActionTypes from "../RecordingActionTypes";
import { RECORDING_COLLECTION, getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";

const addToCollection = () => {
    const recordingContainer = getSavedCollection(RECORDING_COLLECTION);
    const latestRecording = recordingContainer.recordings[recordingContainer.recordings.length - 1]

    const recording = {
        id: latestRecording ? latestRecording.id + 1 : 1,
        started: new Date().toISOString(),
        appliableAuditIds: [],
    }
    recordingContainer.recordings.push(recording);

    updateSavedCollection(RECORDING_COLLECTION, recordingContainer);

    return recording;
}


const completed = recording => ({
    type: RecordingActionTypes.RECORDING_START_COMPLETE,
    payload: { recording }
})

const failed = () => ({
    type: RecordingActionTypes.RECORDING_START_FAILED,
})

export default () => dispatch => {
    try {

        const recording = addToCollection();

        dispatch(completed(recording))

    } catch (error) {

        dispatch(failed())

    }
}