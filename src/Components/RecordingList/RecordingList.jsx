import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactList from "react-list";
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
                    <span className="material-icons">radio_button_checked</span>
                </button>
            </div>
        </div>
        <div className="recordingList-container">
            <ReactList
                itemRenderer={(index, key) => <Recording key={key} recording={recordings[index]} />}
                length={recordings.length}
                type="uniform"
                pageSize={3}
            />
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