import React from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export const Bar = ({ children }) => (
    <AppBar position="static">
        <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
                {children}
            </Typography>
        </Toolbar>
    </AppBar>
);

Bar.propTypes = {
    children: PropTypes.node,
}

export default Bar;