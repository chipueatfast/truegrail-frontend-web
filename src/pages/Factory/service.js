
import randomBytes from 'randombytes';
import { showNotice } from '~/utils/notice';
import API from '~/api/index';
import { createCorrespondingSneakerHash, generateKeyPair, generateRandomEosAccountName, executeSmartContractMethod } from '~/utils/eosio';
import { getSelfId, getEosName } from '~/utils/localStorage';
import { asyncTryCatchReq } from '~/utils/customAxios';

export const notifyNewSneaker = async (sneakerId) => {
    showNotice('info',`Successfully issued sneaker no.${sneakerId}`);
}

function generateSneakerId() {
    return randomBytes(6).readUIntBE(0, 6);
}


async function isFactoryOfContract(password) {
    const rs = await executeSmartContractMethod({
        method: 'checkfactory',
        namedParams: {
            factory: getEosName(),
            factory_id: getSelfId(),
        },
    }, password);
    if (rs.error) {
        return false;
    }
    return true;
}

export async function authenticateIssuingSneaker(password) {
    if (!(await isFactoryOfContract(password))) {
        return {
            error: 'Invalid credential',
        }
    }
    return {};
} 

// const [error, data] = await asyncTryCatchReq({
//     url: API().issueSneaker(getSelfId()),
//     data: {
//         claimEosName,
//         claimPublicKey,
//     },
//     method: 'POST',
// }, true);

export const registerSneakerDetailToDatabase = async ({
    id,
    claimEosName,
    claimPublicKey,
    model,
    limitedEdition,
    brand,
    colorway,
    size,
    releaseDate,
    furtherSpec,
}) => {
    const [error] = await asyncTryCatchReq({
        url: API().issueSneaker(getSelfId()),
        data: {
            id,
            claimEosName,
            claimPublicKey,
            model,
            limitedEdition,
            brand,
            colorway,
            size,
            releaseDate,
            furtherSpec,
        },
        method: 'POST',
    }, true);
    if (error) {
        return {
            error,
        };
    };
    return {};
}

export async function getIssuedSneakers() {
    const [err, rs] = await asyncTryCatchReq({
        url: API().getIssuedSneaker(getSelfId()),
    }, true);

    if (err) {
        return [];
    }
    return rs.data.sneakers;
}

export async function issueSneakerToSystem(password, blockchainSneaker) { 
    const newSneaker = await registerSneakerDetailToDatabase(blockchainSneaker);

    if (newSneaker.error) {
        return {
            error: newSneaker.error,
        };
    }

    const {
        id,
        claimEosName,
        infoHash,
    } = blockchainSneaker;

    const blockchainRs = await executeSmartContractMethod({
        method: 'issue',
        namedParams: {
            factory: getEosName(),
            factory_id: getSelfId(),
            toclaim: claimEosName,
            sneaker_id: id,
            sneaker_info_hash: infoHash,
        }
    }, password);
    if (blockchainRs.error) {
        return {
            error: blockchainRs.error,
        }
    };
    return {};
}

export async function markAsFraud(password, sneakerId) {
    const blockchainRs = await executeSmartContractMethod({
        method: 'markfraud',
        namedParams: {
            factory: getEosName(),
            factory_id: getSelfId(),
            sneaker_id: sneakerId,
        },
    }, password);

    if (blockchainRs.error) {
        return false;
    }

    return true;
}

export async function generateStampDetail(batchInfo) {
    const id = generateSneakerId();
    const toConvert = batchInfo.releaseDate;
    const month = toConvert.getMonth() + 1;
    const month2Digit = `${Math.floor(month/10)}${month % 10}`;
    const date = toConvert.getDate();
    const date2Digit = `${Math.floor(date/10)}${date % 10}`;
    const infoHash = createCorrespondingSneakerHash({
        ...batchInfo,
        size: parseFloat(batchInfo.size).toFixed(1),
        releaseDate: `${1900 + toConvert.getYear()}-${month2Digit}-${date2Digit}`,
        factoryId: getSelfId(),
    });
    const eosName = generateRandomEosAccountName();
    const {
        privateKey,
        publicKey,
    } = await generateKeyPair();
    return {
        id,
        infoHash,
        eosCreds: {
            privateKey,
            publicKey,
            eosName,
        },
    };
}