import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles"

import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import Bar from "../Components/Bar/Bar";
import TaskList from "../Components/TaskList/TaskList";
import RecordingList from "../Components/RecordingList/RecordingList";
import AuditList from "../Components/AuditList/AuditList";

import { loadSavedTasks } from "../Store/taskActions";
import { loadSavedAudits } from "../Store/Audit/AuditAction";
import { loadSavedRecordings } from "../Store/Recording/RecordingAction";

const useContainerStyles = makeStyles({
    root: {
        padding: "1em",
        maxHeight: "90vh"
    }
})

export const TodoApp = ({ loadSavedTasks, loadSavedAudits, loadSavedRecordings }) => {

    useEffect(() => {
        loadSavedTasks()
        loadSavedAudits()
        loadSavedRecordings()
    }, [loadSavedTasks, loadSavedAudits, loadSavedRecordings])

    const containerClasses = useContainerStyles();
    return (
        <Fragment>
            <Bar>Josh's Todo App</Bar>
            <Grid container className={containerClasses.root} spacing={2}>
                <Grid item xs={8}>
                    <TaskList />
                </Grid>
                <Grid item xs={4}>
                    <RecordingList />
                    <Divider />
                    <AuditList />
                </Grid>
            </Grid>
        </Fragment>
    );
}

TodoApp.propTypes = {
    loadSavedTasks: PropTypes.func,
    loadSavedAudits: PropTypes.func,
    loadSavedRecordings: PropTypes.func,
}

TodoApp.defaultProps = {
    loadSavedTasks: () => { },
    loadSavedAudits: () => { },
    loadSavedRecordings: () => { },
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
    loadSavedTasks: () => dispatch(loadSavedTasks()),
    loadSavedAudits: () => dispatch(loadSavedAudits()),
    loadSavedRecordings: () => dispatch(loadSavedRecordings())
})


export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);