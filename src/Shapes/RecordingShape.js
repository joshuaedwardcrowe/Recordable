import PropTypes from "prop-types";

export default PropTypes.shape({
    id: PropTypes.number.isRequired,
    started: PropTypes.string.isRequired,
    stopped: PropTypes.bool.isRequired,
    ended: PropTypes.string,
});