import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";


import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import CreateIcon from "@material-ui/icons/Create";
import SaveIcon from "@material-ui/icons/SaveOutlined";
import DeleteIcon from "@material-ui/icons/Delete";

import { TaskShape } from "../../shapes";

const useStyles = makeStyles({
    root: {
        marginRight: "1.5em"
    }
})

const Task = props => {
    const classes = useStyles();
    const [editing, setEditing] = useState(!props.task.id);
    const [task, setTask] = useState(props.task);

    const invertEditing = () => setEditing(!editing);

    const handleChange = ({ target: { name, value } }) => setTask({ ...task, [name]: value })

    useEffect(() => {
        if (task.id) {
            // TODO: Redux action for Save.
        } else {
            // TODO: redux action for insert.
        }
    }, [task])

    const renderDisplay = () => (
        <>
            <ListItemText
                primary={`${task.name} - ${task.description}`}
                secondary={task.created} // TODO: use humanizer to make pretty
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
                >
                    <SaveIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </>
    )


    return (
        <ListItem>
            {
                editing ? renderEditing() : renderDisplay()
            }
        </ListItem>
    );
}

Task.propTypes = {
    task: TaskShape.isRequired,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Task);