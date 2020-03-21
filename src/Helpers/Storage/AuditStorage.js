import { AUDIT_CONTAINER } from "./constants";
import { getContainer, updateContainer } from "./index";

const initialContainer = {
    audits: []
}

export const CreateAuditContainer = () => {
    updateContainer(AUDIT_CONTAINER, initialContainer)
}

export const GetAudits = () => {
    const { audits } = getContainer(AUDIT_CONTAINER);
    return audits;
}

export const GetAuditsByIds = auditIds => {
    const { audits } = getContainer(AUDIT_CONTAINER);
    return audits.filter(audit => auditIds.includes(audit.id));
}


export const AddAudit = (taskId, fieldName, oldValue, newValue) => {
    const auditContainer = getContainer(AUDIT_CONTAINER);
    const auditRecentlyAdded = auditContainer.audits[auditContainer.audits.length - 1];

    const audit = {
        id: auditRecentlyAdded ? auditRecentlyAdded.id + 1 : 1,
        taskId: taskId,
        fieldName,
        oldValue,
        newValue,
        actioned: new Date().toISOString()
    };

    auditContainer.audits.push(audit);

    updateContainer(AUDIT_CONTAINER, auditContainer);

    return audit;
}