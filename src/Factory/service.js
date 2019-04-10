
import randomBytes from 'randombytes';
import SHA256 from 'crypto-js/sha256';
import web3Provider from '../MetaMask';

import TrueGrailTokenContract from '../contracts/TrueGrailToken';


export async function issueSneaker(id, hashInfo, onSuccess, onError) {
    const instance = await TrueGrailTokenContract.deployed();
    try {
        const rs = await instance.issueToken(id, hashInfo, {
            from: '0x8909969a0deA718d996eb1e82e67B484F831909f',
        });

        if (rs && rs.tx) {
            onSuccess(rs.tx);
        }
    } catch(e) {
        onError();
        console.log(web3Provider.eth.defaultAccount);
    }
}

export async function getFirstFactory() {
    const instance = await TrueGrailTokenContract.deployed();
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
    const {
        words,
    } = SHA256(JSON.stringify({
        ...info,
        id,
        condition: 'ds',
        quantity: null,
    }));

    let wholeHash = '';
    words.forEach(w => {
        wholeHash += w;
    })

    return {
        id,
        hashInfo: wholeHash,
    };
}