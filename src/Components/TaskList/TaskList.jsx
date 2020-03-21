import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactList from "react-list";
import AddIcon from "@material-ui/icons/Add";
import Task from "../Task/Task";
import TaskShape from "../../Shapes/TaskShape";
import PrepareToAddTask from "../../Store/Task/TaskActions/PrepareToAddTask"

import "./taskList.scss";

const TaskList = ({ tasks, addTask }) => (
    <div className="taskList">
        <div className="taskList-header">
            <div className="taskList-header-left">
                <p>Your Tasks <span className="taskList-count">({tasks.length})</span></p>
            </div>
            <div className="taskList-header-right">
                <button onClick={addTask}>
                    <AddIcon />
                </button>
            </div>
        </div>
        <div className="taskList-container">
            <ReactList
                itemRenderer={(index, key) => <Task key={key} task={tasks[index]} />}
                length={tasks.length}
                type="uniform"
            />
        </div>
    </div>
);

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(TaskShape),
    addTask: PropTypes.func,
};

TaskList.defaultProps = {
    tasks: [],
    addTask: () => { }
}

const mapStateToProps = ({ taskState: { tasks } }) => ({ tasks })

const mapDispatchToProps = dispatch => ({
    addTask: () => dispatch(PrepareToAddTask()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);