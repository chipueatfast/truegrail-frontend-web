import Web3 from 'web3';
import { initTrueGrailTokenContract } from './trueGrailTokenContract';

let web3Provider;
export async function initWeb3Provider() {
    if (window.ethereum) {
        const ethereum = window.ethereum;
        web3Provider = new Web3(ethereum);
        await initTrueGrailTokenContract(web3Provider);
    }
}

function getWeb3Provider() {
    return web3Provider;
}


export default getWeb3Provider;