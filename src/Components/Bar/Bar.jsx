import React from "react";
import PropTypes from "prop-types";

import "./styles.scss";

export const Bar = ({ children }) => (
    <header className="bar">
        <div className="logo">
            {children}
        </div>
    </header>
);

Bar.propTypes = {
    children: PropTypes.node,
}

export default Bar;