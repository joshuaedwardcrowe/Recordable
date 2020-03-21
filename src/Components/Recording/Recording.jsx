import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import DeleteIcon from "@material-ui/icons/Delete";

import { FormatToBreakdown, FormatToTimestamp, CalculateMillisecondTimeDifference } from "../../Helpers/timeHelper"

import { RecordingShape } from "../../shapes";
import StopRecording from "../../Store/Recording/RecordingActions/StopRecording"
import StartPlayingRecording from "../../Store/Recording/RecordingActions/StartPlayingRecording";
import StopPlayingRecording from "../../Store/Recording/RecordingActions/StopPlayingRecording";
import DeleteRecording from "../../Store/Recording/RecordingActions/DeleteRecording"

import "./recording.scss";


export class Recording extends Component {

    constructor(props) {
        super(props);

        this.state = {
            millisecondCounter: CalculateMillisecondTimeDifference(props.recording.started, props.recording.ended),
            stoppingRecording: false,
            playingRecording: false,
        };

        this.countupInterval = null;
        this.countdownInterval = null;

        if (!props.recording.ended) {
            this.beginCountUp();
        }
    }

    componentWillUnmount = () => {
        clearInterval(this.countupInterval);
        clearInterval(this.countdownInterval);
    }

    beginCountUp = () => {
        this.countupInterval = setInterval(() => {
            if (this.state.stoppingRecording) {
                clearInterval(this.countupInterval)
                return;
            }

            this.setState({ millisecondCounter: this.state.millisecondCounter + 1 })
        }, 1000)
    }

    getRecordingStatus = () => {
        if (!this.props.recording.ended) return "started";
        if (this.state.playingRecording) return "playing"
        return "";
    }

    stop = () => {
        this.setState({ stoppingRecording: true });
        this.props.stopThisRecording(this.props.recording, this.state.millisecondCounter);
    }

    stopPlaying = () => {
        clearInterval(this.countdownInterval);
        this.setState({ playingRecording: false });
        this.props.stopPlaying(this.props.recording.id);
    }

    play = () => {
        this.setState({ playingRecording: true });
        this.props.playThisRecording(this.props.recording.id);

        this.countdownInterval = setInterval(() => {
            if (!this.state.millisecondCounter) {
                clearInterval(this.countdownInterval);
            }

            this.setState({ millisecondCounter: this.state.millisecondCounter - 1 });
        }, 1000)
    }

    delete = () => {
        this.props.deleteThisRecording(this.props.recording.id);
    }

    render = () => (
        <div className={`recording ${this.getRecordingStatus()}`}>
            <div className="recording-left">
                <p>Started at {FormatToTimestamp(this.props.recording.started)}</p>
                <p>Duration: {FormatToBreakdown(this.state.millisecondCounter)}</p>
            </div>
            <div className="recording-right">
                {
                    // If the recording has no .ended value, it hasn't finished recording.
                    !this.props.recording.ended &&
                    <button onClick={this.stop}>
                        <StopIcon />
                    </button>
                }
                {
                    // If we're not playing the recording, it has not ended and been played in the first place.
                    this.state.playingRecording &&
                    <button onClick={this.stopPlaying}>
                        <StopIcon />
                    </button>
                }
                {
                    // if we're not currently playing the recording and it is not currently still recording, we can play it.
                    !this.state.playingRecording && this.props.recording.ended &&
                    <button onClick={this.play}>
                        <PlayArrowIcon />
                    </button>
                }
                <button onClick={this.delete}>
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