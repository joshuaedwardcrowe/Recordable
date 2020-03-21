import * as AuditActionTypes from "../AuditActionTypes";
import { CreateAuditContainer } from "../../../Helpers/Storage/AuditStorage";

const completed = () => ({
    type: AuditActionTypes.AUDIT_CLEAR_COMPLETE
})

const failed = () => ({
    type: AuditActionTypes.AUDIT_CLEAR_FAILED
})

export default () => dispatch => {
    try {
        CreateAuditContainer();
        dispatch(completed())
    } catch (error) {
        dispatch(failed())
    }
}