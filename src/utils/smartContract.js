import { promisify } from 'util';
import { Transaction as EthereumTx } from 'ethereumjs-tx';
import web3Provider from '~/singletons/web3Provider';
import trueGrailTokenContract from '~/singletons/trueGrailTokenContract';
import { getItemFromStorage } from './localStorage';

const promisifiedSendSigned = promisify(web3Provider().eth.sendSignedTransaction);

export async function callSmartContractMethod({
    isPureGet,
    method,
    privateKey,
}) {
    const address = getItemFromStorage('user') ? getItemFromStorage('user').address : '';
    const nonce = address ? await web3Provider().eth.getTransactionCount(address) : '0x00';
    const data = method.encodeABI();
    const txParams = {
        from: address,
        nonce,
        gasPrice: 3000,
        gasLimit: 250000,
        to: trueGrailTokenContract()._address,
        data,
        value: 0,
    };
    if (isPureGet) {
        const promisifiedCall = promisify(method.call);
        const callbackResult = await promisifiedCall({from: address,});
        return callbackResult;
    }
    const tx = new EthereumTx(txParams, {  hardfork: 'petersburg' });
    tx.sign(Buffer.from(privateKey, 'hex'));
    const rawTx = `0x${tx.serialize().toString('hex')}`;
    return promisifiedSendSigned(rawTx);
}