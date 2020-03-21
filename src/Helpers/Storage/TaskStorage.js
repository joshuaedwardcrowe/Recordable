import { TASK_CONTAINER } from "./constants";
import { getContainer, updateContainer } from "./index";

const initialContainer = {
    tasks: []
}

export const CreateTaskContainer = () => {
    updateContainer(TASK_CONTAINER, initialContainer);
}

export const GetTasks = () => {
    const { tasks } = getContainer(TASK_CONTAINER);
    return tasks;
}

export const AddOrUpdateTask = (task, fieldName, newValue) => {
    const container = getContainer(TASK_CONTAINER);
    const foundTask = container.tasks.find(containedTask => containedTask.id === task.id)

    if (!foundTask) {
        task[fieldName] = newValue;
        container.tasks.push(task);
        updateContainer(TASK_CONTAINER, container);

        return foundTask;
    }

    foundTask[fieldName] = newValue;
    updateContainer(TASK_CONTAINER, container);

    return foundTask;
}

export const ClearTask = taskId => {
    const container = getContainer(TASK_CONTAINER);

    let foundTask = container.tasks.find(task => task.id === taskId);
    const otherTasks = container.tasks.filter(task => task.id !== foundTask.id);

    foundTask = { ...foundTask, name: "", description: "" };
    container.tasks = [...otherTasks, foundTask];

    updateContainer(TASK_CONTAINER, container);
}

export const DeleteTask = taskId => {
    const container = getContainer(TASK_CONTAINER);
    container.tasks = container.tasks.filter(task => task.id !== taskId);
    updateContainer(TASK_CONTAINER, container);
}