import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { AuditShape } from "../../shapes";

export const Audit = ({ audit: { taskId, fieldName, oldValue, newValue, actioned } }) => (
    <ListItem divider>
        <ListItemText
            primary={`#${taskId}: Field '${fieldName}' Changed from ${oldValue} => ${newValue}`}
            secondary={`Actioned at ${actioned}`} // TODO: get duration
        />
    </ListItem>
);

Audit.propTypes = {
    audit: AuditShape.isRequired,
};


export default Audit;