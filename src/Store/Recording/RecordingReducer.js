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
                auditsLoading: false,
            }
        case RecordingActionTypes.RECORDING_SAVE_COMPLETE: {
            return {
                ...state,
                recordings: [...state.recordings, action.payload.recordings]
            }
        }
        default:
            return state;
    }
}

export default RecordingReducer;