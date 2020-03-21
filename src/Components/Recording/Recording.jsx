import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import DeleteIcon from "@material-ui/icons/Delete";

import { FormatToBreakdown, FormatToTimestamp, CalculateMillisecondTimeDifference } from "../../Helpers/timeHelper"

import { RecordingShape } from "../../shapes";
import StopRecording from "../../Store/Recording/RecordingActions/StopRecording"
import StartPlayingRecording from "../../Store/Recording/RecordingActions/StartPlayingRecording";
import DeleteRecording from "../../Store/Recording/RecordingActions/DeleteRecording"

import "./recording.scss";
import StopPlayingRecording from "../../Store/Recording/RecordingActions/StopPlayingRecording";

export const Recording = ({ recording, playThisRecording, stopPlaying, stopThisRecording, deleteThisRecording }) => {

    const millisecondsPassedCurrently = CalculateMillisecondTimeDifference(recording.started, recording.ended);
    const [millisecondCounter, setMillisecondCounter] = useState(millisecondsPassedCurrently)
    const [stoppingRecording, setStoppingRecording] = useState(false);
    const [playingRecording, setPlayingRecording] = useState(false);

    const stopRecording = recording => {
        setStoppingRecording(true);
        stopThisRecording(recording, millisecondCounter);
    }

    const stopPlayingThisRecording = recordingId => {
        setPlayingRecording(false);
        stopPlaying(recordingId);
    }

    const playThis = () => {
        setPlayingRecording(true);
        playThisRecording(recording.id);
    }

    const deleteThis = () => {
        deleteThisRecording(recording.id);
    }

    const getRecordingStatus = () => {
        if (!recording.ended) return "started";
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
                {
                    // If the recording has no .ended value, it hasn't finished recording.
                    !recording.ended &&
                    <button onClick={() => stopRecording(recording)}>
                        <StopIcon />
                    </button>
                }
                {
                    // If we're not playing the recording, it has not ended and been played in the first place.
                    playingRecording &&
                    <button onClick={() => stopPlayingThisRecording(recording.id)}>
                        <StopIcon />
                    </button>
                }
                {
                    // if we're not currently playing the recording and it is not currently still recording, we can play it.
                    !playingRecording && recording.ended &&
                    <button onClick={playThis}>
                        <PlayArrowIcon />
                    </button>
                }
                <button onClick={deleteThis}>
                    <DeleteIcon />
                </button>
            </div>
        </div >
    )
}

Recording.propTypes = {
    recording: RecordingShape.isRequired,
    recordingActiveId: PropTypes.number,
    stopThisRecording: PropTypes.func,
    playThisRecording: PropTypes.func,
    pauseThisRecording: PropTypes.func,
    deleteThisRecording: PropTypes.func,
};

Recording.defaultProps = {
    recordingActiveId: null,
    stopThisRecording: () => { },
    playThisRecording: () => { },
    pauseThisRecording: () => { },
    deleteThisRecording: () => { },
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
    stopThisRecording: (recording, millisecondsRecorded) => dispatch(StopRecording(recording, millisecondsRecorded)),
    playThisRecording: recordingId => dispatch(StartPlayingRecording(recordingId)),
    stopPlaying: recordingId => dispatch(StopPlayingRecording(recordingId)),
    deleteThisRecording: recordingId => dispatch(DeleteRecording(recordingId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recording);