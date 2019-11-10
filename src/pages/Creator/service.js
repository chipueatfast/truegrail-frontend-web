import { asyncTryCatchReq } from '~/utils/customAxios';
import API from '~/api';
import { composeAccessTokenHeader } from '~/utils/authorization';
import { createCorrespondingUserHash, getRecordFromTableByKey } from '~/utils/eosTable';

export async function addFactoryFromCreator(factory) {
    const expectedUserHash = createCorrespondingUserHash({
        ...factory,
        role: 'factory',
    })
    const [err, rs] = await asyncTryCatchReq({
        method: 'post',
        url: API().addFactory(),
        data: {
            ...factory,
            role: 'factory',
        },
        headers: composeAccessTokenHeader(),
    });

    if (rs) {
        const {
            data: {
                id,
            }
        } = rs;
        const resultFromBlockchain = (await getRecordFromTableByKey({
            table: 'users',
            id,
        }))[0];
        if (resultFromBlockchain.info_hash !== expectedUserHash) {
            return {
                err: 'Blockchain mismatch',
            };
        }
    }
    return {
        err,
        rs,
    };
}