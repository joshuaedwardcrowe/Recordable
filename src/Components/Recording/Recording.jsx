import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles"

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteIcon from "@material-ui/icons/Delete";

import { RecordingShape } from "../../shapes";

const useStyles = makeStyles({
    root: {
        marginRight: "1.5em"
    }
})

export const Recording = ({ recording: { id, started, ended } }) => {
    const classes = useStyles();
    return (
        <ListItem divider>
            <>
                <ListItemText
                    primary="Primary Fuck Off Dezoz"
                    secondary="Secondary Fuck off Dezoz"
                />
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        className={classes.root}
                    >
                        <PlayArrowIcon />
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
        </ListItem>
    );
}

Recording.propTypes = {
    recording: RecordingShape.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Recording);