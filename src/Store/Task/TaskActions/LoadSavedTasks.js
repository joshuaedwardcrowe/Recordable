import * as TaskActionTypes from "../TaskActionTypes";
import { getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";

const TASK_STORAGE_IDENTIFIER = "TODOAPP_TASKS";

const begin = () => ({
    type: TaskActionTypes.TASK_LOAD
})

const completed = (tasks) => ({
    type: TaskActionTypes.TASK_LOAD_COMPLETE,
    payload: { tasks },
});

const failed = () => ({
    type: TaskActionTypes.TASK_LOAD_FAILED
})

export default () => dispatch => {
    dispatch(begin())

    try {
        const { tasks } = getSavedCollection(TASK_STORAGE_IDENTIFIER)

        if (tasks.length) {
            dispatch(completed(tasks));
        } else {
            dispatch(failed())
        }
    } catch (error) {
        updateSavedCollection(TASK_STORAGE_IDENTIFIER, { tasks: [] })
        dispatch(failed())
    }
}