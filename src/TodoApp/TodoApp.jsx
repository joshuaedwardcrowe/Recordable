import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Bar from "../Components/Bar/Bar";
import TaskList from "../Components/TaskList/TaskList";
import RecordingList from "../Components/RecordingList/RecordingList";
import AuditList from "../Components/AuditList/AuditList";
import LoadSavedTasks from "../Store/Task/TaskActions/LoadSavedTasks";
import loadSavedRecordings from "../Store/Recording/RecordingActions/LoadSavedRecordings"
import LoadSavedAudits from "../Store/Audit/AuditActions/LoadSavedAudits"
import "./todoApp.scss";

export const TodoApp = ({ loadSavedTasks, loadSavedAudits, loadSavedRecordings }) => {

    useEffect(() => {
        loadSavedTasks()
        loadSavedAudits()
        loadSavedRecordings()
    }, [loadSavedTasks, loadSavedAudits, loadSavedRecordings])

    return (
        <>
            <Bar>Recordable Todo</Bar>
            <div className="recordable">
                <div className="recordable-left">
                    <TaskList />
                </div>
                <div className="recordable-right">
                    <RecordingList />
                    <div className="recordable-divider"></div>
                    <AuditList />
                </div>
            </div>
        </>
    )
}

TodoApp.propTypes = {
    loadSavedTasks: PropTypes.func,
    loadSavedAudits: PropTypes.func,
    loadSavedRecordings: PropTypes.func,
}

TodoApp.defaultProps = {
    loadSavedTasks: () => { },
    loadSavedRecordings: () => { },
    loadSavedAudits: () => { },
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
    loadSavedTasks: () => dispatch(LoadSavedTasks()),
    loadSavedRecordings: () => dispatch(loadSavedRecordings()),
    loadSavedAudits: () => dispatch(LoadSavedAudits())

})

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);