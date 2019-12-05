
import randomBytes from 'randombytes';
import { showNotice } from '~/utils/notice';
import API from '~/api/index';
import { createCorrespondingSneakerHash, generateKeyPair, generateRandomEosAccountName, executeSmartContractMethod } from '~/utils/eosio';
import { getItemFromStorage, getSelfId, getEosName } from '~/utils/localStorage';
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
            error: blockchainRs.error.message,
        }
    };
    return {};
}

export async function generateStampDetail(batchInfo) {
    const user = getItemFromStorage('user');
    const id = generateSneakerId();
    const infoHash = createCorrespondingSneakerHash({
        ...batchInfo,
        issuerId: user.id,
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