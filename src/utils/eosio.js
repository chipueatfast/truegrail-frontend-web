import { Keygen } from 'eosjs-keygen';
import { JsonRpc, Api, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import CryptoJS from 'crypto-js';
import { getItemFromStorage } from './localStorage';

const rpc = new JsonRpc(process.env.REACT_APP_NODEOS_URL);

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
        code: 'truegrail2',
        scope: 'truegrail2',
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
    const keys = ['email', 'username', 'eosName', 'publicKey', 'role', 'address', 'brand'];
    const orderedUser = sortToGivenOrder({
        object: user,
        keys,
    });
    return CryptoJS.SHA256(JSON.stringify(orderedUser)).toString();
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
