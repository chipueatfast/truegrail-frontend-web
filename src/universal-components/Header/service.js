import API from '~/api/index';
import { asyncTryCatchReq } from '~/utils/customAxios';
import { getSelfId } from '~/utils/localStorage';

export async function checkIfStillUsingDefaultPassword() {
    const [err, rs] = await asyncTryCatchReq({
        url: API().getPasswordStatus(getSelfId()),
    }, true);
    if (err) {
        return false;
    }
    return rs.data.isUsingDefault;
}