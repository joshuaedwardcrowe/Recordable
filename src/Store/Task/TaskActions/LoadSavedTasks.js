import * as TaskActionTypes from "../TaskActionTypes";
import { CreateTaskContainer, GetTasks } from "../../../Helpers/Storage/TaskStorage";

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
        const tasks = GetTasks();

        if (!tasks) {
            CreateTaskContainer();
            dispatch(failed());
        }

        if (tasks.length) {
            dispatch(completed(tasks));
        } else {
            dispatch(failed())
        }
    } catch (error) {
        CreateTaskContainer();
        dispatch(failed())
    }
}