import API from '~/api/index';
import { asyncTryCatchReq } from '~/utils/customAxios';
import { getSelfId } from '~/utils/localStorage';
import { decryptPrivateKey, encryptPrivateKey } from '~/utils/eosio';
import { getEncryptedPrivateKey } from '~/utils/localStorage';

export async function changePassword({
    oldPassword,
    newPassword,
}) {
    let currentPrivateKey;

    try {
        currentPrivateKey = decryptPrivateKey(getEncryptedPrivateKey(), oldPassword);
    } catch (e) {
        return false;
    }

    const newEncryptedPrivateKey = encryptPrivateKey(currentPrivateKey, newPassword);

    const [err] = await asyncTryCatchReq({
        url: API().changePassword(getSelfId()),
        method: 'patch',
        data: {
            oldPassword,
            newPassword,
            newEncryptedPrivateKey,
        },
    }, true)

    if (err) {
        return false;
    }

    return true;
}