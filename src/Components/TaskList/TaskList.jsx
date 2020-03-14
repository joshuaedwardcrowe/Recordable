import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";

import Task from "../Task/Task";
import { TaskShape } from "../../shapes";
import { prepareToAddTask } from "../../Store/taskActions";

const TaskList = ({ tasks }) => (
    <Paper elevation={5}>
        <ListSubheader>
            Your Tasks
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                >
                    <AddIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListSubheader>
        <Divider />
        {
            tasks
            .filter(task => !task.deleted)
            .sort((a, b) => a.created < b.created)
            .map(task => (
                <Task
                    key={task.id}
                    task={task}
                />))
        }
    </Paper>
);

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(TaskShape).isRequired,
    addTask: PropTypes.func,
};

TaskList.defaultProps = {
    addTask: () => {}
}

const mapStateToProps = ({ tasks }) => ({ tasks });

const mapDispatchToProps = dispatch => ({
    addTask: () => dispatch(prepareToAddTask()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);