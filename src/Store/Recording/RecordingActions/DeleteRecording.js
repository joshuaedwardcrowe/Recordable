import * as RecordingActionTypes from "../RecordingActionTypes";
import { DeleteRecording } from "../../../Storage/RecordingStorage";

const failed = recordingId => ({
    type: RecordingActionTypes.RECORDING_DELETE_FAILED,
    payload: { recordingId }
})

const completed = recordingId => ({
    type: RecordingActionTypes.RECORDING_DELETE_COMPLETE,
    payload: { recordingId }
})

export default recordingId => dispatch => {
    try {
        DeleteRecording(recordingId);
        dispatch(completed(recordingId))
    } catch (error) {
        dispatch(failed(recordingId))
    }
}