import * as RecordingActionTypes from "../RecordingActionTypes";
import { UpdateRecordingStopped } from "../../../Helpers/Storage/RecordingStorage";

const completed = recording => ({
    type: RecordingActionTypes.RECORDING_STOP_PLAYING_COMPLETE,
    payload: { recording }
})

const failed = () => ({
    type: RecordingActionTypes.RECORDING_STOP_PLAYING_FAILED,
})

export default recordingId => dispatch => {
    try {

        const updatedRecording = UpdateRecordingStopped(recordingId, true);

        dispatch(completed(updatedRecording))

    } catch (error) {
        dispatch(failed())
    }
}