import PropTypes from "prop-types";

export default PropTypes.shape({
    id: PropTypes.number.isRequired,
    taskId: PropTypes.number.isRequired,
    fieldName: PropTypes.string.isRequired,
    oldValue: PropTypes.string,
    newValue: PropTypes.string.isRequired,
    actioned: PropTypes.string.isRequired,
});