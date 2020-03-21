import * as RecordingActionTypes from "../RecordingActionTypes";
import { AddRecordingAuditId } from "../../../Helpers/Storage/RecordingStorage";


const completed = (recordingId, auditId) => ({
    type: RecordingActionTypes.RECORDING_ASSOCIATE_AUDIT_COMPLETE,
    payload: { recordingId, auditId }
})

const failed = recording => ({
    type: RecordingActionTypes.RECORDING_ASSOCIATE_AUDIT_FAILED,
    payload: { recording }
})

export default (recordingId, auditId) => dispatch => {
    try {

        AddRecordingAuditId(recordingId, auditId);

        dispatch(completed(recordingId, auditId))

    } catch (error) {
        dispatch(failed())
    }
}