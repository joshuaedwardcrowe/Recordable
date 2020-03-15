import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles"

import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Paper from "@material-ui/core/Paper";

import Recording from "../Recording/Recording";
import { RecordingShape } from "../../shapes";

const useStyles = makeStyles({
    root: {
        height: "30vh"
    }
})

const RecordingList = ({ recordings }) => {
    const classes = useStyles();
    return (
        <>
            <ListSubheader>
                Your Recordings ({recordings.length})
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                    >
                        <PlayArrowIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListSubheader>
            <Paper elevation={5} className={classes.root}>
                {
                    recordings
                        .filter(task => !task.deleted)
                        .sort((a, b) => a.started < b.started)
                        .map(recording => (
                            <Recording
                                key={recording.id}
                                recordings={recording}
                            />))
                }
            </Paper>
        </>
    );
}

RecordingList.propTypes = {
    recordings: PropTypes.arrayOf(RecordingShape).isRequired,
};

RecordingList.defaultProps = {
    recordings: [],
}

const mapStateToProps = ({ recordings }) => ({ recordings });

export default connect(mapStateToProps)(RecordingList);