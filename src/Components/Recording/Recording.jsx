import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles"

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import DeleteIcon from "@material-ui/icons/Delete";

import { FormatToBreakdown, FormatToTimestamp, CalculateMillisecondTimeDifference } from "../../Helpers/timeHelper"

import { RecordingShape } from "../../shapes";
import { stopRecording, playRecording, deleteRecording } from "../../Store/Recording/RecordingAction"

const usePrimaryListItemActionStyles = makeStyles({
    root: {
        marginRight: "1.5em"
    }
})

export const Recording = ({ recording, stopThisRecording, playThisRecording, deleteThisRecording }) => {

    const primaryListItemActionClasses = usePrimaryListItemActionStyles();

    const millisecondsPassedCurrently = CalculateMillisecondTimeDifference(recording.started, recording.ended);
    const [millisecondCounter, setMillisecondCounter] = useState(millisecondsPassedCurrently)
    const [stoppingRecording, setStoppingRecording] = useState(false);

    const stopThis = () => {
        setStoppingRecording(true);
        stopThisRecording(recording, millisecondCounter);
    }

    const playThis = () => playThisRecording(recording.id);
    const deleteThis = () => deleteThisRecording(recording.id);

    useEffect(() => {
        if (!recording.ended) {
            const interval = setInterval(() => {
                if (stoppingRecording) {
                    clearInterval(interval);
                    return;
                }

                setMillisecondCounter(millisecondCounter + 1)
            }, 1000)
            return () => clearInterval(interval);
        }
    })

    return (
        <ListItem divider>
            <>
                <ListItemText
                    primary={`Started at ${FormatToTimestamp(recording.created)}`}
                    secondary={`Duration: ${FormatToBreakdown(millisecondCounter)}`}
                />
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        className={primaryListItemActionClasses.root}
                        onClick={recording.ended ? playThis : stopThis}
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
    recordingActiveId: PropTypes.number,
    stopThisRecording: PropTypes.func,
    playThisRecording: PropTypes.func,
    deleteThisRecording: PropTypes.func,
};

Recording.defaultProps = {
    recordingActiveId: null,
    stopThisRecording: () => { },
    playThisRecording: () => { },
    deleteThisRecording: () => { },
}

const mapStateToProps = ({ recordingState: { recordingActiveId } }) => ({ recordingActiveId })

const mapDispatchToProps = dispatch => ({
    stopThisRecording: (recording, millisecondsRecorded) => dispatch(stopRecording(recording, millisecondsRecorded)),
    playThisRecording: recordingId => dispatch(playRecording(recordingId)),
    deleteThisRecording: recordingId => dispatch(deleteRecording(recordingId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recording);