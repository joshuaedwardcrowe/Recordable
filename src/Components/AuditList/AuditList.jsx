import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles"
import { Scrollbars } from "react-custom-scrollbars";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Audit from "../Audit/Audit";
import { clearAudits } from "../../Store/Audit/AuditAction";
import { AuditShape } from "../../shapes";

const useStyles = makeStyles({
    root: {
        height: "40vh"
    }
})

const AuditList = ({ audits, clearTheseAudits }) => {
    const classes = useStyles();
    return (
        <>
            <ListSubheader>
                Your Audits ({audits.length})
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        onClick={clearTheseAudits}

                    >
                        <CloseIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListSubheader>
            <Divider />
            <Paper elevation={5} className={classes.root}>
                <Scrollbars autoHide>
                    {
                        audits
                            .reverse()
                            .map((audit, index) => (
                                <Audit
                                    key={`audit-${index}`}
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
    clearTheseAudits: PropTypes.func,
};

AuditList.defaultProps = {
    audits: [],
    clearTheseAudits: () => { }
}

const mapStateToProps = ({ auditState: { audits } }) => ({ audits });

const mapDispatchToProps = dispatch => ({
    clearTheseAudits: () => dispatch(clearAudits())
})

export default connect(mapStateToProps, mapDispatchToProps)(AuditList);