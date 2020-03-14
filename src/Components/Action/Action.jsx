import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import {ActionShape} from "../../shapes";

export const Action = ({ action: { taskId, field, oldValue, newValue, actioned } }) => (
    <ListItem>
        <ListItemText
            primary={`#${taskId}: Field '${field}' Changed from ${oldValue} => ${newValue}`}
            secondary={`Actioned at ${actioned}`} // TODO: get duration
        />
    </ListItem>
);

Action.propTypes = {
    action: ActionShape.isRequired,
};


export default Action;