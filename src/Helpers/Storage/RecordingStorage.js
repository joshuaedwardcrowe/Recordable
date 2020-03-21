import { RECORDING_CONTAINER } from "./constants";
import { getContainer, updateContainer } from "./index";

const initialContainer = {
    recordings: []
}

export const CreateRecordingContainer = () => {
    updateContainer(RECORDING_CONTAINER, initialContainer);
}

export const GetRecording = recordingId => {
    const { recordings } = getContainer(RECORDING_CONTAINER);
    return recordings.find(recording => recording.id === recordingId);
}

export const GetRecordings = () => {
    const { recordings } = getContainer(RECORDING_CONTAINER);
    return recordings;
}

export const GetActiveRecording = () => {
    const { recordings } = getContainer(RECORDING_CONTAINER);
    return recordings.find(recording => !recording.ended);
}

export const AddRecording = () => {
    const container = getContainer(RECORDING_CONTAINER);
    const recordingRecentlyAdded = container.recordings[container.recordings.length - 1];

    const recording = {
        id: recordingRecentlyAdded ? recordingRecentlyAdded.id + 1 : 1,
        started: new Date().toISOString(),
        stopped: false,
        auditIds: [],
    }

    container.recordings.push(recording);

    updateContainer(RECORDING_CONTAINER, container);

    return recording;
}

export const AddRecordingAuditId = (recordingId, auditId) => {
    const container = getContainer(RECORDING_CONTAINER);

    const foundRecording = container.recordings.find(recording => recording.id === recordingId);
    const otherRecordings = container.recordings.filter(recording => recording.id !== foundRecording.id);

    container.recordings = [
        ...otherRecordings,
        {
            ...foundRecording,
            auditIds: [
                ...foundRecording.auditIds,
                auditId
            ]
        }
    ]

    updateContainer(RECORDING_CONTAINER, container);
}

export const UpdateRecordingStopped = (recordingId, stopped) => {

    // e.g. { recordings: [] }
    const container = getContainer(RECORDING_CONTAINER);

    const foundRecording = container.recordings.find(recording => recording.id === recordingId);
    const otherRecordings = container.recordings.filter(x => x.id !== foundRecording.id);

    foundRecording.stopped = stopped;

    container.recordings = [...otherRecordings, foundRecording]

    updateContainer(RECORDING_CONTAINER, container);

    return foundRecording;
}

export const UpdateRecordingEnded = (recordingId, ended) => {
    const container = getContainer(RECORDING_CONTAINER);

    const foundRecording = container.recordings.find(recording => recording.id === recordingId);
    const otherRecordings = container.recordings.filter(x => x.id !== foundRecording.id);

    foundRecording.ended = ended;

    container.recordings = [...otherRecordings, foundRecording];

    updateContainer(RECORDING_CONTAINER, container);

    return foundRecording;
}

export const DeleteRecording = recordingId => {
    const container = getContainer(RECORDING_CONTAINER);
    container.recordings = container.recordings.filter(recording => recording.id !== recordingId);
    updateContainer(RECORDING_CONTAINER, container);
}