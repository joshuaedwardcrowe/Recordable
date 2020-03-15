import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles"
import moment from "moment";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import DeleteIcon from "@material-ui/icons/Delete";

import { RecordingShape } from "../../shapes";
import { stopRecording, deleteRecording } from "../../Store/Recording/RecordingAction"

const useStyles = makeStyles({
    root: {
        marginRight: "1.5em"
    }
})


const FormatRecordingDuration = (time) => {
    if (time < 0) time = 0;
    const seconds = time % 60;
    time = (time - seconds) / 60;
    const minutes = time % 60;
    const hours = (time - minutes) / 60;
    return `${hours}:${`0${minutes}`.slice(-2)}:${`0${seconds}`.slice(-2)}`;
};

export const Recording = ({ recording, stopThisRecording, deleteThisRecording }) => {

    const classes = useStyles();

    const initialMilliseconds = recording.ended
        ? moment(recording.ended).diff(recording.started, "milliseconds")
        : 0;

    const [millisecondCounter, setMillisecondCounter] = useState(initialMilliseconds)

    const stopThis = () => stopThisRecording(recording);

    const deleteThis = () => deleteThisRecording(recording.id);

    const stopPlaying = () => { }

    useEffect(() => {
        if (!recording.ended) {
            const interval = setInterval(() => {
                setMillisecondCounter(millisecondCounter + 1)
            }, 1000);
            return () => clearInterval(interval);
        }
    })

    return (
        <ListItem divider>
            <>
                <ListItemText
                    primary={`Started at ${moment(recording.started).format('Do MMMM YYYY @ HH:mm')}`}
                    secondary={`Duration: ${FormatRecordingDuration(millisecondCounter)}`}
                />
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        className={classes.root}
                        onClick={recording.ended ? stopPlaying : stopThis}
                    >
                        {recording.ended ? <PlayArrowIcon /> : <StopIcon />}
                    </IconButton>
                </ListItemSecondaryAction>
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        onClick={deleteThis}
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
    stopThisRecording: PropTypes.func,
    deleteThisRecording: PropTypes.func,
};

Recording.defaultProps = {
    stopThisRecording: () => { },
    deleteThisRecording: () => { },
}

const mapStateToProps = ({ recordingState: { recordings } }) => ({ recordings });

const mapDispatchToProps = dispatch => ({
    stopThisRecording: recordingId => dispatch(stopRecording(recordingId)),
    deleteThisRecording: recordingId => dispatch(deleteRecording(recordingId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recording);