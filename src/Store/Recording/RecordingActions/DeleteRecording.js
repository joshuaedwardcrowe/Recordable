import * as RecordingActionTypes from "../RecordingActionTypes";
import { getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";

const RECORDING_STORAGE_IDENTIFIER = "TODOAPP_RECORDING";

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

export default recordingId => dispatch => {
    try {

        deleteRecordingInCollection(recordingId);

        dispatch(completedDeletingRecordInCollection(recordingId))

    } catch (error) {

        dispatch(failedDeletingRecordingInCollection(recordingId))
    }
}