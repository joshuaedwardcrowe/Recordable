import * as RecordingActionTypes from "../RecordingActionTypes";
import { GetActiveRecording, AddRecording } from "../../../Storage/RecordingStorage";

const completed = recording => ({
    type: RecordingActionTypes.RECORDING_START_PLAYING_COMPLETE,
    payload: { recording }
})

const failed = () => ({
    type: RecordingActionTypes.RECORDING_START_PLAYING_FAILED,
})

export default () => dispatch => {
    try {

        const activeRecording = GetActiveRecording();

        if (activeRecording) {
            dispatch(failed());
            return;
        }

        const recording = AddRecording();

        dispatch(completed(recording))

    } catch (error) {

        dispatch(failed())

    }
}