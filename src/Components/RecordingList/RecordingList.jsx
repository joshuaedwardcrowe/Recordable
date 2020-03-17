import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Recording from "../Recording/Recording";
import { startRecording } from "../../Store/Recording/RecordingAction"
import { RecordingShape } from "../../shapes";
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
    // <>
    //     <ListSubheader>
    //         Your Recordings ({recordings.length})
    //             <ListItemSecondaryAction>
    //             <IconButton
    //                 edge="end"
    //                 onClick={startNew}
    //             >
    //                 <PlayArrowIcon />
    //             </IconButton>
    //         </ListItemSecondaryAction>
    //     </ListSubheader>
    //     <Paper elevation={5} className={classes.root}>
    //         <Scrollbars autoHide>
    //         </Scrollbars>
    //     </Paper>
    // </>
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
    startNew: () => dispatch(startRecording())
})

export default connect(mapStateToProps, mapDispatchToProps)(RecordingList);