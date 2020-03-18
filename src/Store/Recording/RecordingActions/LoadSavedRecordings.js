import * as RecordingActionTypes from "../RecordingActionTypes";
import { RECORDING_COLLECTION, getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";

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
        const { recordings } = getSavedCollection(RECORDING_COLLECTION);

        if (recordings.length) {
            dispatch(completed(recordings))
        } else {
            dispatch(failed())
        }
    } catch (error) {
        updateSavedCollection(RECORDING_COLLECTION, { recordings: [] })
        dispatch(failed())
    }
}