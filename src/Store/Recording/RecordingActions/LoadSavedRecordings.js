import * as RecordingActionTypes from "../RecordingActionTypes";
import { getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";

const RECORDING_STORAGE_IDENTIFIER = "TODOAPP_RECORDING";

const begin = () => ({
    type: RecordingActionTypes.RECORDING_LOAD,
});

const completed = recordings => ({
    type: RecordingActionTypes.RECORDING_LOAD_COMPLETE,
    payload: { recordings }
})

const failed = () => ({
    type: RecordingActionTypes.RECORDING_LOAD_FAILED
})

export default () => dispatch => {
    dispatch(begin());

    try {
        const { recordings } = getSavedCollection(RECORDING_STORAGE_IDENTIFIER);

        if (recordings.length) {
            dispatch(completed(recordings))
        } else {
            dispatch(failed())
        }
    } catch (error) {
        updateSavedCollection(RECORDING_STORAGE_IDENTIFIER, { recordings: [] })
        dispatch(failed())
    }
}