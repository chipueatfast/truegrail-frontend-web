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
    return resultFromBlockchain.info_hash === expectedUserHash;
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
        if (!await checkFactoryInfoConsistency({
            ...factory,
            id,
        })) {
            return {
                err: {
                    message: 'Blockchain mismatch',
                },
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
        const factories = rs.data;
        for (let i = 0; i < rs.data.length; i++) {
            if (await checkFactoryInfoConsistency(factories[i])) {
                verifiedFactory.push(factories[i]);
            }
        }
    } else {
        return {
            err,
        };
    }
    return verifiedFactory;
}