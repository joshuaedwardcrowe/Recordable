import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";

import Recording from "../Recording/Recording";
import { RecordingShape } from "../../shapes";

const RecordingList = ({ recordings }) => (
    <Fragment>
        <ListSubheader>
            Your Recordings
        </ListSubheader>
        <Paper elevation={5}>
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
    </Fragment>
);

RecordingList.propTypes = {
    recordings: PropTypes.arrayOf(RecordingShape).isRequired,
};

RecordingList.defaultProps = {
    recordings: [],
}

const mapStateToProps = ({ recordings }) => ({ recordings });

export default connect(mapStateToProps)(RecordingList);