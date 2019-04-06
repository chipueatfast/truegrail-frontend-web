import TruffleContract from 'truffle-contract';
import randomBytes from 'randombytes';
import SHA256 from 'crypto-js/sha256';
import TrueGrailToken from '../contracts/TrueGrailToken.json';
import web3Provider from '../MetaMask';

const TrueGrailTokenContract = TruffleContract(TrueGrailToken);

TrueGrailTokenContract.setProvider(web3Provider.currentProvider);
TrueGrailTokenContract.defaults({from: web3Provider.eth.defaultAccount});

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