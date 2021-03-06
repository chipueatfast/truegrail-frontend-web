import { asyncTryCatchReq } from '~/utils/customAxios';
import API from '~/api';
import { composeAccessTokenHeader } from '~/utils/authorization';
import { 
    createCorrespondingUserHash, 
    getRecordFromTableByKey,
    generateKeyPair,
    encryptPrivateKey,
    executeSmartContractMethod,
    generateRandomEosAccountName,
} from '~/utils/eosio';
import { simulateLongFetch } from '~/utils/async';

export async function addNewFactoryToSystem({
    formValues,
    password,
}) {
    if (!await isCreatorOfContract(password)) {
        return {
            error: 'You are not the creator',
        }
    }
    const {
        id,
        eosName,
        publicKey,
        error: databaseError,
    } = await addFactoryToDatabase(formValues);

    if (databaseError) {
        return {
            error: databaseError,
        }
    }

    const eosInfoHash = createCorrespondingUserHash({
        ...formValues,
        eosName,
        role: 'factory',
        publicKey,
    });

    const {
        error: blockchainError,
    } = await uploadFactoryInfoHashOntoBlockchain({
        id,
        role: 'factory',
        eosName,
        eosInfoHash,
    }, password);
    if (blockchainError) {
        return {
            error: blockchainError,
        };
    }
    return {
        newFactory: {
            ...formValues,
            eosName,
            role: 'factory',
            publicKey,
            isBlockchainMatched: true,
        },
    };
}

export async function populateVerifiedFactoryTable() {
    const [err, rs] = await asyncTryCatchReq({
        url: API().getAllFactories(),
        method: 'get', 
    });
    const verifiedFactory = [];
    if (rs) {
        const factories = rs.data.factories;
        for (let i = 0; i < factories.length; i++) {
            verifiedFactory.push({
                ...factories[i],
                isBlockchainMatched: await checkFactoryInfoConsistency(factories[i]),
            });
        }
    } else {
        return {
            err,
        };
    }
    return verifiedFactory;
}

async function isCreatorOfContract(password) {
    const rs = await executeSmartContractMethod({
        method: 'checkcreator',
        namedParams: {},
    }, password);
    if (rs.error) {
        return false;
    }
    return true;
};

async function composeFactoryRegistrationInfo(values) {
    const {
        publicKey,
        privateKey,
    } = await generateKeyPair();
    const defaultPassword = '1';
    const eosName = generateRandomEosAccountName();
    const encryptedPrivateKey = encryptPrivateKey(privateKey, defaultPassword);
    const role = 'factory';
    
    return {
        ...values,
        publicKey,
        encryptedPrivateKey,
        role,
        password: defaultPassword,
        eosName,
    };
}

async function addFactoryToDatabase(factory) {
    const factoryFullDetail = await composeFactoryRegistrationInfo(factory);
    const [err, rs] = await asyncTryCatchReq({
        method: 'post',
        url: API().addFactory(),
        data: factoryFullDetail,
        headers: composeAccessTokenHeader(),
    });

    if (err) {
        return {
            error: err,
        };
    }

    if (rs) {
        const {
            data: {
                id,
            }
        } = rs;
        const {
            eosName,
            publicKey,
        } = factoryFullDetail;

        return {
            id,
            eosName,
            publicKey,
        };
    }
}

async function checkFactoryInfoConsistency(factory) {
    const {
        id,
    } = factory;
    const resultFromBlockchain = (await getRecordFromTableByKey({
        table: 'users',
        id,
    }))[0];
    await simulateLongFetch(1000);
    const expectedUserHash = createCorrespondingUserHash({
        ...factory,
        role: 'factory',
    });
    if (!resultFromBlockchain) {
        return false;
    }
    return resultFromBlockchain.info_hash === expectedUserHash;
}

async function uploadFactoryInfoHashOntoBlockchain({
    id,
    role,
    eosInfoHash,
    eosName,
}, password) {
    const rs = await executeSmartContractMethod({
        method: 'insertuser',
        namedParams: {
            user_id: id,
            eos_name: eosName,
            user_info_hash: eosInfoHash,
            role,
        },
    }, password);
    if (rs.error) {
        return {
            error: rs.error,
        }
    };
    return {};
}
