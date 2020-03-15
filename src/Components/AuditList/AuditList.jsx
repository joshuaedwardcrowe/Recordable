import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles"
import { Scrollbars } from "react-custom-scrollbars";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Audit from "../Audit/Audit";
import { AuditShape } from "../../shapes";

const useStyles = makeStyles({
    root: {
        height: "40vh"
    }
})

const AuditList = ({ audits }) => {
    const classes = useStyles();
    return (
        <>
            <ListSubheader>
                Your Audits ({audits.length})
            </ListSubheader>
            <Divider />
            <Paper elevation={5} className={classes.root}>
                <Scrollbars autoHide>
                    {
                        audits
                            .reverse()
                            .map(audit => (
                                <Audit
                                    key={audit.id}
                                    audit={audit}
                                />))
                    }
                </Scrollbars>
            </Paper>
        </>
    );
}

AuditList.propTypes = {
    actions: PropTypes.arrayOf(AuditShape),
};

AuditList.defaultProps = {
    audits: [],
}

const mapStateToProps = ({ auditState: { audits } }) => ({ audits });

export default connect(mapStateToProps)(AuditList);