import * as RecordingActionTypes from "../RecordingActionTypes";
import { getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";

const RECORDING_STORAGE_IDENTIFIER = "TODOAPP_RECORDING";

const failed = recordingId => ({
    type: RecordingActionTypes.RECORDING_DELETE_FAILED,
    payload: { recordingId }
})

const completed = recordingId => ({
    type: RecordingActionTypes.RECORDING_DELETE_COMPLETE,
    payload: { recordingId }
})

const deleteInCollection = recordingId => {
    const recordingContainer = getSavedCollection(RECORDING_STORAGE_IDENTIFIER);
    recordingContainer.recordings = recordingContainer.recordings.filter(({ id }) => id !== recordingId);
    updateSavedCollection(RECORDING_STORAGE_IDENTIFIER, recordingContainer);
}

export default recordingId => dispatch => {
    try {
        deleteInCollection(recordingId);
        dispatch(completed(recordingId))
    } catch (error) {
        dispatch(failed(recordingId))
    }
}