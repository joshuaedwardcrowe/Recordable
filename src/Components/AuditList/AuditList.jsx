import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactList from "react-list";
import CloseIcon from "@material-ui/icons/Close"
import Audit from "../Audit/Audit";
import AuditShape from "../../Shapes/AuditShape"
import ClearAudits from "../../Store/Audit/AuditActions/ClearAudits"
import "./auditList.scss";

const AuditList = ({ audits, clearTheseAudits }) => {
    const reversedAudits = audits.reverse();
    return (
        <div className="auditList">
            <div className="auditList-header">
                <div className="auditList-header-left">
                    <p>Your Audits <span className="auditList-count">({audits.length})</span></p>
                </div>
                <div className="auditList-header-right">
                    <button onClick={clearTheseAudits}>
                        <CloseIcon />
                    </button>
                </div>
            </div>
            <div className="auditList-container">
                <ReactList
                    itemRenderer={(index, key) => <Audit key={key} audit={reversedAudits[index]} />}
                    length={audits.length}
                    type="uniform"
                    pageSize={5}
                />
            </div>
        </div>
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
    clearTheseAudits: () => dispatch(ClearAudits())
})

export default connect(mapStateToProps, mapDispatchToProps)(AuditList);