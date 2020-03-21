import * as AuditActionTypes from "../AuditActionTypes";
import { CreateAuditContainer, GetAudits } from "../../../Storage/AuditStorage"

export const begin = () => ({
    type: AuditActionTypes.AUDIT_LOAD
});

export const completed = audits => ({
    type: AuditActionTypes.AUDIT_LOAD_COMPLETE,
    payload: { audits }
})

export const failed = audits => ({
    type: AuditActionTypes.AUDIT_LOAD_FAILED
})

export default () => dispatch => {
    dispatch(begin());

    try {
        const audits = GetAudits();

        if (!audits) {
            CreateAuditContainer();
            dispatch(failed());
        }

        if (audits.length) {
            dispatch(completed(audits));
        } else {
            dispatch(failed());
        }

    } catch (error) {

        CreateAuditContainer();
        dispatch(failed())

    }
}