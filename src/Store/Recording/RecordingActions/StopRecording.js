import * as RecordingActionTypes from "../RecordingActionTypes";
import { UpdateRecordingEnded } from "../../../Storage/RecordingStorage";


const completed = (recordingId, ended) => ({
    type: RecordingActionTypes.RECORDING_STOP_COMPLETE,
    payload: { recordingId, ended }
})

const failed = () => ({
    type: RecordingActionTypes.RECORDING_STOP_FAILED,
})

export default (recordingId, ended) => dispatch => {
    try {

        UpdateRecordingEnded(recordingId, ended);

        dispatch(completed(recordingId, ended))

    } catch (error) {
        dispatch(failed())
    }
}