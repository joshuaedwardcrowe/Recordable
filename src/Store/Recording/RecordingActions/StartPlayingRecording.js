import { ClearTask } from "../../../Storage/TaskStorage";
import { GetRecording, UpdateRecordingStopped } from "../../../Storage/RecordingStorage";
import { GetAuditsByIds } from "../../../Storage/AuditStorage";
import { CalculateSecondTimeDifference } from "../../../Helpers/timeHelper"
import UnloadTasks from "../../Task/TaskActions/UnloadTasks"
import SaveTask from "../../Task/TaskActions/SaveTask"

const ResetTasksToOriginalState = audits => {
    const distinctAuditIds = audits
        .map(audit => audit.id)
        .filter((audit, index, self) => self.indexOf(audit) === index);

    const distinctAudits = audits.filter(audit => distinctAuditIds.includes(audit.id));

    for (let { taskId } of distinctAudits) {
        ClearTask(taskId);
    }
}

const ApplyAudits = (recording, audits, dispatch) => {

    const differenceInMilliseconds = CalculateSecondTimeDifference(recording.started, recording.ended) * 1000;
    const timeout = differenceInMilliseconds / audits.length;

    const interval = setInterval(() => {

        // Step 1: Get the current recording in this interval.
        const currentRecording = GetRecording(recording.id);

        if (!currentRecording || currentRecording.stopped) {
            clearInterval(interval);
            return;
        }

        if (!audits.length) {
            clearInterval(interval);
            return;
        }

        const { taskId, fieldName, oldValue, newValue } = audits.shift();
        const task = { id: taskId, [fieldName]: oldValue }

        dispatch(SaveTask(task, fieldName, newValue));

    }, timeout)
}

export default recordingId => dispatch => {

    UpdateRecordingStopped(recordingId, false);

    // Step 1: Get this recording. 
    const recording = GetRecording(recordingId);

    // Step 2: Get all audits currently saved audits with these IDs.
    const audits = GetAuditsByIds(recording.auditIds);

    // Step 3: If there are no audits, end the action.
    if (!audits.length) return;

    // Step 4: If there are audits, we clear redux's Task state so we can see it appear.
    dispatch(UnloadTasks());

    ResetTasksToOriginalState(audits);

    ApplyAudits(recording, audits, dispatch);

}