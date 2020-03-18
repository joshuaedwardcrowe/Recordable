import * as RecordingActionTypes from "../RecordingActionTypes";
import { RECORDING_COLLECTION, getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";

const failed = recordingId => ({
    type: RecordingActionTypes.RECORDING_DELETE_FAILED,
    payload: { recordingId }
})

const completed = recordingId => ({
    type: RecordingActionTypes.RECORDING_DELETE_COMPLETE,
    payload: { recordingId }
})

const deleteInCollection = recordingId => {
    const recordingContainer = getSavedCollection(RECORDING_COLLECTION);
    recordingContainer.recordings = recordingContainer.recordings.filter(({ id }) => id !== recordingId);
    updateSavedCollection(RECORDING_COLLECTION, recordingContainer);
}

export default recordingId => dispatch => {
    try {
        deleteInCollection(recordingId);
        dispatch(completed(recordingId))
    } catch (error) {
        dispatch(failed(recordingId))
    }
}