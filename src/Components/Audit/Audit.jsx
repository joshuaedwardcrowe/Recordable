import React from "react";
import { FormatToTimestamp } from "../../Helpers/timeHelper";
import AuditShape from "../../Shapes/AuditShape";
import "./audit.scss";

export const Audit = ({ audit: { id, taskId, fieldName, oldValue, newValue, actioned } }) => (
    <div className="audit">
        <p><strong>#{id}</strong> - Changed Task #{taskId}</p>
        <p>
            Field '{fieldName}',
            Was: <span className="audit-oldValue">{oldValue}</span>,
            Now: <span className="audit-newValue">{newValue}</span></p>
        <p>Actioned: {(FormatToTimestamp(actioned))}</p>
    </div>
);

Audit.propTypes = {
    audit: AuditShape.isRequired,
};


export default Audit;