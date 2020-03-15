import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import CloseIcon from "@material-ui/icons/Close";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

import { TaskShape } from "../../shapes";
import { saveTask, unprepareToAddTask, deleteTask } from "../../Store/Task/TaskAction";

const useStyles = makeStyles({
    root: {
        marginRight: "1.5em"
    }
})

const Task = ({ task, saveThisTask, unprepareThisTask, deleteThisTask }) => {
    const classes = useStyles();
    const [editing, setEditing] = useState(!task.created);

    const invertEditing = () => {
        if (!task.created) {
            unprepareThisTask(task.id);
        } else {
            setEditing(!editing);
        }
    }

    const handleChange = ({ target: { name, value } }) => saveThisTask(task, name, value)

    const handleDelete = () => deleteThisTask(task.id);

    const renderDisplay = () => (
        <>
            <ListItemText
                primary={`${task.name} - ${task.description}`}
                secondary={`Created: ${moment(task.created).format('Do MMMM YYYY @ HH:mm')}`}
            />
            <ListItemSecondaryAction>
                <IconButton
                    className={classes.root}
                    edge="end"
                    onClick={invertEditing}
                >
                    <CreateIcon />
                </IconButton>
            </ListItemSecondaryAction>
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    onClick={handleDelete}
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </>
    )



    const renderEditing = () => (
        <>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <TextField
                        label="Name"
                        value={task.name}
                        onChange={handleChange}
                        inputProps={{ name: "name" }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Description"
                        value={task.description}
                        onChange={handleChange}
                        inputProps={{ name: "description" }}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    onClick={invertEditing}
                >
                    <CloseIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </>
    )


    return (
        <ListItem divider>
            {
                editing ? renderEditing() : renderDisplay()
            }
        </ListItem>
    );
}

Task.propTypes = {
    task: TaskShape.isRequired,
    saveThisTask: PropTypes.func,
    unprepareThisTask: PropTypes.func,
    deleteThisTask: PropTypes.func,
};

Task.defaultProps = {
    saveThisTask: () => { },
    unprepareThisTask: () => { },
    deleteThisTask: () => { },
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    saveThisTask: (task, fieldName, newValue) => dispatch(saveTask(task, fieldName, newValue)),
    unprepareThisTask: taskId => dispatch(unprepareToAddTask(taskId)),
    deleteThisTask: taskId => dispatch(deleteTask(taskId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Task);