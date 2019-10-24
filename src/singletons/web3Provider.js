import Web3 from 'web3';
import { initTrueGrailTokenContract } from './trueGrailTokenContract';

let web3Provider;

const network = {
    development: 'ws://127.0.0.1:7545',
    production: 'ws://128.199.134.167:8545',
}


export async function initWeb3Provider() {
    if (window) {
        web3Provider = new Web3(network[process.env.NODE_ENV]);
        await initTrueGrailTokenContract(web3Provider);
    }
}

function getWeb3Provider() {
    return web3Provider;
}


export default getWeb3Provider;