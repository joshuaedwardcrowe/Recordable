import * as TaskActionTypes from "../TaskActionTypes";
import { TASK_COLLECTION, getSavedCollection, updateSavedCollection } from "../../../Helpers/storageHelper";

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
        const { tasks } = getSavedCollection(TASK_COLLECTION)

        if (tasks.length) {
            dispatch(completed(tasks));
        } else {
            dispatch(failed())
        }
    } catch (error) {
        updateSavedCollection(TASK_COLLECTION, { tasks: [] })
        dispatch(failed())
    }
}