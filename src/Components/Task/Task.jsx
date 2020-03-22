import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormatToTimestamp } from "../../Helpers/timeHelper";
import TaskShape from "../../Shapes/TaskShape";
import UnprepareToAddTask from "../../Store/Task/TaskActions/UnprepareToAddTask"
import SaveTask from "../../Store/Task/TaskActions/SaveTask"
import DeleteTask from "../../Store/Task/TaskActions/DeleteTask"
import "./task.scss";

const Task = ({ task, saveThisTask, unprepareThisTask, deleteThisTask }) => {
    const [editing, setEditing] = useState(!task.name && !task.description);

    const invertEditing = () => !task.created ? unprepareThisTask(task.id) : setEditing(!editing);
    const handleChange = ({ target: { name, value } }) => saveThisTask(task, name, value)
    const handleDelete = () => deleteThisTask(task.id);

    const renderDisplay = () => (
        <div className="task-display">
            <div className="task-display-left">
                <p><strong>{task.name || "<Missing Name>"}</strong> - {task.description || "<Missing Description>"}</p>
                <p>Created {FormatToTimestamp(task.created)}</p>
            </div>
            <div className="task-display-right">
                <button onClick={invertEditing}>
                    <span className="material-icons">create</span>
                </button>
                <button onClick={handleDelete}>
                    <span className="material-icons">delete</span>
                </button>
            </div>
        </div>
    )

    const renderEditing = () => (
        <div className="task-editing">
            <div className="task-editing-left">
                <div className="task-editing-input">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={task.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="task-editing-input">
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={task.description}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="task-editing-right">
                <button onClick={invertEditing}>
                    <span className="material-icons">close</span>
                </button>
            </div>
        </div>
    )


    return (
        <div className="task">
            {
                editing ? renderEditing() : renderDisplay()
            }
        </div>
    );
}

Task.propTypes = {
    task: TaskShape.isRequired,
    saveThisTask: PropTypes.func,
    unprepareThisTask: PropTypes.func,
    deleteThisTask: PropTypes.func,
};

Task.defaultProps = {
    task: {
        name: "<Missing Name>",
        description: "<Missing Description>"
    },
    saveThisTask: () => { },
    unprepareThisTask: () => { },
    deleteThisTask: () => { },
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    saveThisTask: (task, fieldName, newValue) => dispatch(SaveTask(task, fieldName, newValue)),
    unprepareThisTask: taskId => dispatch(UnprepareToAddTask(taskId)),
    deleteThisTask: taskId => dispatch(DeleteTask(taskId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Task);