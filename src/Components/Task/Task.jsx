import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import CloseIcon from "@material-ui/icons/Close";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

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

    const formattedCreatedDate = moment(task.created).format('Do MMMM YYYY @ HH:mm');

    const renderDisplay = () => (
        <div className="task-display">
            <div className="task-display-left">
                <p><strong>{task.name}</strong> {task.description}</p>
                <p>Created {formattedCreatedDate}</p>
            </div>
            <div className="task-display-right">
                <button onClick={invertEditing}>
                    <CreateIcon />
                </button>
                <button onClick={handleDelete}>
                    <DeleteIcon />
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
                    <CloseIcon />
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