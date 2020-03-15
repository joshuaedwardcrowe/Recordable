import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { makeStyles } from "@material-ui/styles"

import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Paper from "@material-ui/core/Paper";

import Recording from "../Recording/Recording";
import { startRecording } from "../../Store/Recording/RecordingAction"
import { RecordingShape } from "../../shapes";

const useStyles = makeStyles({
    root: {
        height: "30vh"
    }
})

const RecordingList = ({ recordings, startNew }) => {
    const classes = useStyles();
    return (
        <>
            <ListSubheader>
                Your Recordings ({recordings.length})
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        onClick={startNew}
                    >
                        <PlayArrowIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListSubheader>
            <Paper elevation={5} className={classes.root}>
                <Scrollbars autoHide>
                    {
                        recordings
                            .filter(task => !task.deleted)
                            .reverse()
                            .map(recording => (<Recording key={recording.id} recording={recording} />))
                    }
                </Scrollbars>
            </Paper>
        </>
    );
}

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