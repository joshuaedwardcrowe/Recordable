import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import { RecordingShape } from "../../shapes";
import { playRecording } from "../../Store/taskActions";

export const Recording = ({ recording: { id, started, ended }, play }) => {

    const playRecording = () => ended
        ? play(id)
        : null;

    return (
        <ListItem>
            <ListItemText
                primary={`Recorded at ${started}`} // TODO: Use moment to format?
                secondary={"test"} // TODO: get duration
            />
            <ListItemSecondaryAction>
                <IconButton
                    edge="end"
                    onClick={playRecording}
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
        </ListItem>
    );
}

Recording.propTypes = {
    recording: RecordingShape.isRequired,
    play: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    play: recordingId => dispatch(playRecording(recordingId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recording);