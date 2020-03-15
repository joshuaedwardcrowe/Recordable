import * as RecordingActionTypes from "./RecordingActionTypes";

const initialState = {
    recordings: [],
    recordingsLoading: false,
    recordingActiveId: null,
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
        case RecordingActionTypes.RECORDING_START: {
            const mostRecentRecording = state.recordings[state.recordings.length - 1]

            const newRecording = {
                id: mostRecentRecording ? mostRecentRecording.id + 1 : 1,
                started: new Date().toISOString()
            }

            return {
                ...state,
                recordings: [...state.recordings, newRecording]
            }
        }
        case RecordingActionTypes.RECORDING_SAVE_COMPLETE: {
            const currentRecordings = Array.from(state.recordings);
            const currentRecording = currentRecordings.find(recording => recording.id === action.payload.recording.id)
            const indexOf = currentRecordings.indexOf(currentRecording);

            currentRecordings.splice(indexOf, 1, action.payload.recording);

            return {
                ...state,
                recordings: currentRecordings
            }
        }
        case RecordingActionTypes.RECORDING_PLAYING: {
            return {
                ...state,
                recordingActiveId: action.payload.recordingId,
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