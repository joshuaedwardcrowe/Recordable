import * as RecordingActionTypes from "../RecordingActionTypes";
import { CreateRecordingContainer, GetRecordings } from "../../../Helpers/Storage/RecordingStorage";

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
        const recordings = GetRecordings();

        if (!recordings) {
            CreateRecordingContainer();
            dispatch(failed())
        }

        if (recordings.length) {
            dispatch(completed(recordings))
        } else {
            dispatch(failed())
        }
    } catch (error) {
        CreateRecordingContainer()
        dispatch(failed())
    }
}