import * as RecordingActionTypes from "../RecordingActionTypes";
import { getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";

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

export default () => dispatch => {
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