import { Keygen } from 'eosjs-keygen';
import { JsonRpc, Api, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import CryptoJS from 'crypto-js';
import { getItemFromStorage } from './localStorage';
import { isProduction } from '~/utils/environment';

const EOS_SPEC = isProduction() ? {
    server: 'http://jungle2.cryptolions.io:80',
    smartContract: 'truegrail123',
} : {
    server: 'http://localhost:8888',
    smartContract: 'truegrail2',
};

const rpc = new JsonRpc(EOS_SPEC.server);

export function generateRandomEosAccountName() {
    let result = '';
    const length = 12;
    const characters = '12345abcdefghijklmnopqrstuvwxyz';
    for (let i=0; i<length; i++) {
        const randomIndex = Math.floor(Math.random() * length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

export function encryptPrivateKey(privateKey, password) {
    return CryptoJS.AES.encrypt(privateKey, password).toString();
}

export function decryptPrivateKey(encryptedPrivate, password) {
    const bytes = CryptoJS.AES.decrypt(encryptedPrivate, password);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export async function generateKeyPair() {
    const keypair = await Keygen.generateMasterKeys();
    const {
        privateKeys: {
            active: privateKey,
        },
        publicKeys: {
            active: publicKey,
        }
    } = keypair;

    return {
        privateKey,
        publicKey,
    }

}

export async function getRecordFromTableByKey({
    table,
    id,
}) {
    const rs = await rpc.get_table_rows({
        json: true,
        code: EOS_SPEC.smartContract,
        scope: EOS_SPEC.smartContract,
        table,
        lower_bound: id, 
        upper_bound: id+1,
    });
    return rs.rows;
}

function sortToGivenOrder({
    object,
    keys,
}) {
    const orderedObject = {};
    keys.forEach((key) => {
        orderedObject[key] = object[key];
    });
    return orderedObject;
}

export function createCorrespondingUserHash(user) {
    const keys = ['userIdentity', 'username', 'eosName', 'publicKey', 'role', 'address', 'brand'];
    const orderedUser = sortToGivenOrder({
        object: user,
        keys,
    });
    return CryptoJS.SHA256(JSON.stringify(orderedUser)).toString();
}

export function createCorrespondingSneakerHash(sneaker) {
    const keys = ["brand", "model", "colorway", "limitedEdition", "releaseDate", "size"];
    const orderedSneaker = sortToGivenOrder({
        object: sneaker,
        keys,
    });
    return CryptoJS.SHA256(JSON.stringify(orderedSneaker)).toString();
}


export async function executeSmartContractMethod({
    method,
    namedParams,
}, password) {
    try {
        const {
            encryptedPrivateKey,
            eosName,
        } = getItemFromStorage('user');
        const privateKey = decryptPrivateKey(encryptedPrivateKey, password);
        const signatureProvider = new JsSignatureProvider([privateKey]);
        const api = new Api({
            rpc,
            signatureProvider,
        });
        await api.transact({
            actions: [
                {
                    account: eosName,
                    name: method,
                    authorization: [
                        {
                            actor: eosName,
                            permission: 'active',
                        },
                    ],
                    data: namedParams,
                }]}, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
        return {};
    } catch (e) {
        console.log('\nCaught exception: ' + e);
        if (e instanceof RpcError) {
            console.log(JSON.stringify(e.json, null, 2));
            return {
                error: e.json,
            }
        }
        return {
            error: e.message,
        }
    }
}
