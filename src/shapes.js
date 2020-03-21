import PropTypes from "prop-types";

export const TaskShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    created: PropTypes.string.isRequired,
    deleted: PropTypes.string,
});


export const AuditShape = PropTypes.shape({
    Id: PropTypes.number.isRequired,
    taskId: PropTypes.number.isRequired,
    fieldName: PropTypes.string.isRequired,
    oldValue: PropTypes.string,
    newValue: PropTypes.string.isRequired,
    actioned: PropTypes.string.isRequired,
});

export const RecordingShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    started: PropTypes.string.isRequired,
    stopped: PropTypes.bool.isRequired,
    ended: PropTypes.string,
});