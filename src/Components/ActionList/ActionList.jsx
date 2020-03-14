import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import Action from "../Action/Action";
import {ActionShape} from "../../shapes";

const ActionList = ({ actions }) => (
    <Fragment>
        <ListSubheader>
            Your Actions
        </ListSubheader>
        <Paper elevation={5}>
            {
                actions
                    .sort((a, b) => a.actioned < b.actioned)
                    .map(action => (
                        <Action
                            key={action.id}
                            recordings={action}
                        />))
            }
        </Paper>
    </Fragment>
);

ActionList.propTypes = {
    actions: PropTypes.arrayOf(ActionShape).isRequired,
};

ActionList.defaultProps = {
    actions: [],
}

const mapStateToProps = ({ actions }) => ({ actions });

export default connect(mapStateToProps)(ActionList);