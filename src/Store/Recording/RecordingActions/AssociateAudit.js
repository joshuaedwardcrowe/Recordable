import * as RecordingActionTypes from "../RecordingActionTypes";
import { AddRecordingAuditId } from "../../../Helpers/Storage/RecordingStorage";


const completed = recording => ({
    type: RecordingActionTypes.RECORDING_ASSOCIATE_AUDIT_COMPLETE,
    payload: { recording }
})

const failed = recording => ({
    type: RecordingActionTypes.RECORDING_ASSOCIATE_AUDIT_FAILED,
    payload: { recording }
})

export default (recording, auditId) => dispatch => {
    try {

        AddRecordingAuditId(recording, auditId);

        dispatch(completed())

    } catch (error) {
        dispatch(failed())
    }
}