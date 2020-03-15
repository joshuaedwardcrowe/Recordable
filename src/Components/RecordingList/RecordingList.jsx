import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles"

import ListSubheader from "@material-ui/core/ListSubheader";
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
                Your Recordings
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