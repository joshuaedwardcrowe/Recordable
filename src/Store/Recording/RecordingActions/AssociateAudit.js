import * as RecordingActionTypes from "../RecordingActionTypes";
import { RECORDING_COLLECTION, getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";

const addAuditId = (recording, auditId) => {
    const recordingContainer = getSavedCollection(RECORDING_COLLECTION);
    const existingRecording = recordingContainer.recordings.find(({ id }) => recording.id === id);
    const otherRecordings = recordingContainer.recordings.filter(x => x.id !== existingRecording.id);

    recordingContainer.recordings = [
        ...otherRecordings,
        {
            ...existingRecording,
            appliableAuditIds: [
                ...existingRecording.appliableAuditIds,
                auditId
            ]
        }
    ]

    updateSavedCollection(RECORDING_COLLECTION, recordingContainer);
}

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

        addAuditId(recording, auditId);

        dispatch(completed())

    } catch (error) {
        dispatch(failed())
    }
}