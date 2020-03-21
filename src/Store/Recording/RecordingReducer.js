import * as RecordingActionTypes from "./RecordingActionTypes";

const initialState = {
    recordings: [],
    recordingsLoading: false,
}

export const RecordingReducer = (state = initialState, action) => {
    switch (action.type) {
        case RecordingActionTypes.RECORDING_LOAD:
            return {
                ...state,
                recordingsLoading: true,
            }
        case RecordingActionTypes.RECORDING_LOAD_COMPLETE:
            return {
                ...state,
                recordings: action.payload.recordings,

            }
        case RecordingActionTypes.RECORDING_LOAD_FAILED:
            return {
                ...state,
                recordingsLoading: false,
            }
        case RecordingActionTypes.RECORDING_START_PLAYING_COMPLETE: {
            return {
                ...state,
                recordings: [...state.recordings, action.payload.recording],
                recordingActiveId: action.payload.recording.id
            }
        }
        case RecordingActionTypes.RECORDING_ASSOCIATE_AUDIT_COMPLETE: {
            const currentRecordings = Array.from(state.recordings);
            const currentRecording = currentRecordings.find(recording => recording.id === action.payload.recordingId)
            const indexOf = currentRecordings.indexOf(currentRecording);

            currentRecordings.splice(indexOf, 1, {
                ...currentRecording,
                auditIds: [
                    ...currentRecording.auditIds,
                    action.payload.auditId
                ]
            })

            return {
                ...state,
                recordings: currentRecordings
            }
        }
        case RecordingActionTypes.RECORDING_STOP_PLAYING_COMPLETE: {
            const currentRecordings = Array.from(state.recordings);
            const currentRecording = currentRecordings.find(recording => recording.id === action.payload.recordingId)
            const indexOf = currentRecordings.indexOf(currentRecording);

            currentRecordings.splice(indexOf, 1, {
                ...currentRecording,
                stopped: action.payload.stopped
            })

            return {
                ...state,
                recordings: currentRecordings
            }
        }
        case RecordingActionTypes.RECORDING_STOP_COMPLETE: {
            const currentRecordings = Array.from(state.recordings);
            const currentRecording = currentRecordings.find(recording => recording.id === action.payload.recordingId)
            const indexOf = currentRecordings.indexOf(currentRecording);

            currentRecordings.splice(indexOf, 1, {
                ...currentRecording,
                ended: action.payload.ended
            })

            return {
                ...state,
                recordings: currentRecordings
            }
        }
        case RecordingActionTypes.RECORDING_DELETE_COMPLETE: {
            return {
                ...state,
                recordings: state.recordings.filter(recording => recording.id !== action.payload.recordingId)
            }
        }
        default:
            return state;
    }
}

export default RecordingReducer;