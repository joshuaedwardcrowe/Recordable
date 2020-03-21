import * as RecordingActionTypes from "../RecordingActionTypes";
import { UpdateRecordingStopped } from "../../../Helpers/Storage/RecordingStorage";

const completed = (recordingId, stopped) => ({
    type: RecordingActionTypes.RECORDING_STOP_PLAYING_COMPLETE,
    payload: { recordingId, stopped }
})

const failed = () => ({
    type: RecordingActionTypes.RECORDING_STOP_PLAYING_FAILED,
})

export default recordingId => dispatch => {
    try {

        UpdateRecordingStopped(recordingId, true);

        dispatch(completed(recordingId, true))

    } catch (error) {
        dispatch(failed())
    }
}