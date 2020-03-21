import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Recording from "../Recording/Recording";
import RecordingShape from "../../Shapes/RecordingShape";
import StartRecording from "../../Store/Recording/RecordingActions/StartRecording"
import "./recordingList.scss"

const RecordingList = ({ recordings, startNew }) => (
    <div className="recordingList">
        <div className="recordingList-header">
            <div className="recordingList-header-left">
                <p>Your Recordings <span className="recordingList-count">({recordings.length})</span></p>
            </div>
            <div className="recordingList-header-right">
                <button onClick={startNew}>
                    <PlayArrowIcon />
                </button>
            </div>
        </div>
        <div className="recordingList-container">
            {
                recordings
                    .filter(task => !task.deleted)
                    .reverse()
                    .map(recording => (<Recording key={recording.id} recording={recording} />))
            }
        </div>
    </div>
);

RecordingList.propTypes = {
    recordings: PropTypes.arrayOf(RecordingShape),
};

RecordingList.defaultProps = {
    recordings: [],
    startNew: () => { }
}

const mapStateToProps = ({ recordingState: { recordings } }) => ({ recordings });

const mapDispatchToProps = dispatch => ({
    startNew: () => dispatch(StartRecording())
})

export default connect(mapStateToProps, mapDispatchToProps)(RecordingList);