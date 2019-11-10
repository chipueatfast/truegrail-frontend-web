import { asyncTryCatchReq } from '~/utils/customAxios';
import API from '~/api';
import { composeAccessTokenHeader } from '~/utils/authorization';
import { createCorrespondingUserHash, getRecordFromTableByKey } from '~/utils/eosTable';

export async function checkFactoryInfoConsistency(factory) {
    const {
        id,
    } = factory;
    const resultFromBlockchain = (await getRecordFromTableByKey({
        table: 'users',
        id,
    }))[0];
    const expectedUserHash = createCorrespondingUserHash({
        ...factory,
        role: 'factory',
    });
    return resultFromBlockchain === expectedUserHash;
}

export async function addFactoryFromCreator(factory) {
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
        if (!checkFactoryInfoConsistency({
            ...factory,
            id,
        })) {
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

export async function populateVerifiedFactoryTable() {
    const [err, rs] = await asyncTryCatchReq({
        url: API().getAllFactories(),
        method: 'get', 
    });
    const verifiedFactory = [];
    if (rs) {
        rs.data.forEach(factory => {
            if (checkFactoryInfoConsistency(factory)) {
                verifiedFactory.push(factory);
            }
        });
    } else {
        return {
            err,
        };
    }
    return verifiedFactory;
}