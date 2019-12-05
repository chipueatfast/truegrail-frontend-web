
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

async function createClaimAccountForSneaker({
    claimEosName,
    claimPublicKey
}) {
    const [error, data] = await asyncTryCatchReq({
        url: API().createSneakerClaimAccount(getSelfId()),
        data: {
            claimEosName,
            claimPublicKey,
        },
        method: 'POST',
    }, true);
    if (error) {
        return false;
    };
    if (data.claimEosName && data.claimPublicKey) {
        return true;
    }

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

export async function issueSneakerToSystem(password, blockchainSneaker) {
    const {
        id,
        claimEosName,
        infoHash,
        claimPublicKey,
    } = blockchainSneaker;
    const isRegisteredOnEos = await createClaimAccountForSneaker({
        claimEosName,
        claimPublicKey,
    })
    if (!isRegisteredOnEos) {
        return {
            error: 'The claim account can not be created',
        }
    }
    const rs = await executeSmartContractMethod({
        method: 'issue',
        namedParams: {
            factory: getEosName(),
            factory_id: getSelfId(),
            toclaim: claimEosName,
            sneaker_id: id,
            sneaker_info_hash: infoHash,
        }
    }, password);
    if (rs.error) {
        return {
            error: rs.error.message,
        }
    };
    return {};
}

export async function generateStampDetail(batchInfo) {
    const user = getItemFromStorage('user');
    const id = generateSneakerId();
    const hash = createCorrespondingSneakerHash({
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
        hash,
        eosCreds: {
            privateKey,
            publicKey,
            eosName,
        },
    };
}