import PropTypes from "prop-types";

export const TaskShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    deleted: PropTypes.string.isRequired,
});


export const ActionShape = PropTypes.shape({
    taskId: PropTypes.number.isRequired,
    field: PropTypes.string.isRequired,
    oldValue: PropTypes.string.isRequired,
    newValue: PropTypes.string.isRequired,
    actioned: PropTypes.instanceOf(Date).isRequired,
});

export const RecordingShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    started: PropTypes.instanceOf(Date).isRequired,
    ended: PropTypes.instanceOf(Date).isRequired,
});