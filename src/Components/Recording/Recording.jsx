import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import {RecordingShape} from "../../shapes";
import {markRecordingAsSelected, playRecording, unmarkRecordingAsSelected} from "../../Store/taskActions";

export const Recording = ({ recording: { id, started, ended, isMarked  }, markRecordingAsSelected, unmarkRecordingAsSelected, play }) => {

    const toggleMarkedStatus = () => isMarked
        ? markRecordingAsSelected(id)
        : unmarkRecordingAsSelected(id);

    const playRecording = () => ended
        ? play(id)
        : null;

    return (
        <ListItem>
            <ListItemAvatar>
                {
                    isMarked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />
                }
            </ListItemAvatar>
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
                    onClick={toggleMarkedStatus}
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

Recording.propTypes = {
    recording: RecordingShape.isRequired,
    markRecordingAsSelected: PropTypes.func.isRequired,
    unmarkRecordingAsSelected: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    markRecordingAsSelected: recordingId => dispatch(markRecordingAsSelected(recordingId)),
    unmarkRecordingAsSelected: recordingId => dispatch(unmarkRecordingAsSelected(recordingId)),
    play: recordingId => dispatch(playRecording(recordingId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recording);