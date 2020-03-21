import React from "react";
import moment from "moment";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import AuditShape from "../../Shapes/AuditShape";

export const Audit = ({ audit: { taskId, fieldName, oldValue, newValue, actioned } }) => {

    const formattedActionedDate = moment(actioned).format('Do MMMM YYYY @ HH:mm');

    return (
        <ListItem divider>
            <ListItemText
                primary={`Task #${taskId}: Field '${fieldName}' Changed from ${oldValue} => ${newValue}`}
                secondary={`Actioned: ${formattedActionedDate}`} // TODO: get duration
            />
        </ListItem>
    );
}

Audit.propTypes = {
    audit: AuditShape.isRequired,
};


export default Audit;