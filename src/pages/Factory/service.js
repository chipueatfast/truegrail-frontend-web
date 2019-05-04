
import randomBytes from 'randombytes';
import hash from 'object-hash';
import web3Provider from '~/MetaMask';

import contractStore from '~/stores/contractStore';
import TrueGrailTokenContract from '~/contracts/TrueGrailToken';
import userStore from '~/stores/userStore';


export async function issueSneaker(id, hashInfo, onSuccess, onError) {
    const instance = await contractStore.getTrueGrailInstance();
    if (instance) {
        try {
            const ethCall = await instance.issueToken(id, hashInfo, {
                from: userStore.address,
            }).on('error', e => {

            });
            if (ethCall && ethCall.tx) {
                onSuccess(ethCall.tx);
            }
        } catch(e) {
            onError();
        }
    }
}

export async function getFirstFactory() {
    const instance = await TrueGrailTokenContract();
    return instance.factories(0);
}

export function generateSneakerId(quantity) {
    let ids = [];
    for (let i = 0; i < quantity; i++) {
        ids.push(randomBytes(6).readUIntBE(0, 6));
    }
    return ids;
}

export function hashInitInfoJSON(id, info) {
    delete info.quantity;
    const dataHash = hash({
        id,
        ...info,
    });

    return {
        id,
        hashInfo: dataHash,
    };
}