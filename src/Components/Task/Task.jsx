import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import DeleteIcon from "@material-ui/icons/Delete";

import { TaskShape } from "../../shapes";
import { markTaskAsSelected, unmarkTaskAsSelected } from "../../Store/taskActions";

const Task = ({ task: { id, name, description, created, isMarked }, markTaskAsSelected, unmarkTaskAsSelected }) => {

    const toggleMarkedStatus = () => isMarked
        ? markTaskAsSelected(id)
        : unmarkTaskAsSelected(id);

    return (
        <ListItem>
            <ListItemAvatar>
                {
                    isMarked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />
                }
            </ListItemAvatar>
            <ListItemText
                primary={`${name} - ${description}`}
                secondary={created}
            />
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    onClick={toggleMarkedStatus}
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

Task.propTypes = {
    task: TaskShape.isRequired,
    markTaskAsSelected: PropTypes.func.isRequired,
    unmarkTaskAsSelected: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    markTaskAsSelected: taskId => dispatch(markTaskAsSelected(taskId)),
    unmarkTaskAsSelected: taskId => dispatch(unmarkTaskAsSelected(taskId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);