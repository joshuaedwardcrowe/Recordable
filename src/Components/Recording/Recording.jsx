import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import DeleteIcon from "@material-ui/icons/Delete";

import { FormatToBreakdown, FormatToTimestamp, CalculateMillisecondTimeDifference } from "../../Helpers/timeHelper"

import { RecordingShape } from "../../shapes";
import StopRecording from "../../Store/Recording/RecordingActions/StopRecording"
import PlayRecording from "../../Store/Recording/RecordingActions/PlayRecording";
import DeleteRecording from "../../Store/Recording/RecordingActions/DeleteRecording"

import "./recording.scss";

export const Recording = ({ recording, recordingActiveId, playThisRecording, stopThisRecording, deleteThisRecording }) => {

    const millisecondsPassedCurrently = CalculateMillisecondTimeDifference(recording.started, recording.ended);
    const [millisecondCounter, setMillisecondCounter] = useState(millisecondsPassedCurrently)
    const [stoppingRecording, setStoppingRecording] = useState(false);
    const [playingRecording, setPlayingRecording] = useState(false);
    const isThisRecordingActive = recording.id === recordingActiveId;

    const stopThis = () => {
        setStoppingRecording(true);
        stopThisRecording(recording, millisecondCounter);
    }

    const playThis = () => {
        setPlayingRecording(true);
        playThisRecording(recording.id);
    }
    const deleteThis = () => deleteThisRecording(recording.id);

    const getRecordingStatus = () => {
        if (isThisRecordingActive) return "started";
        if (playingRecording) return "playing"
        return "";
    }

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
        <div className={`recording ${getRecordingStatus()}`}>
            <div className="recording-left">
                <p>Started at {FormatToTimestamp(recording.started)}</p>
                <p>Duration: {FormatToBreakdown(millisecondCounter)}</p>
            </div>
            <div className="recording-right">
                <button onClick={recording.ended ? playThis : stopThis}>
                    {recording.ended ? <PlayArrowIcon /> : <StopIcon />}
                </button>
                <button onClick={deleteThis}>
                    <DeleteIcon />
                </button>
            </div>
        </div>
    )
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
    stopThisRecording: (recording, millisecondsRecorded) => dispatch(StopRecording(recording, millisecondsRecorded)),
    playThisRecording: recordingId => dispatch(PlayRecording(recordingId)),
    deleteThisRecording: recordingId => dispatch(DeleteRecording(recordingId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recording);