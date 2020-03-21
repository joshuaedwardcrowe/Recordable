import PropTypes from "prop-types";

export default PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    created: PropTypes.string.isRequired,
    deleted: PropTypes.string,
});
