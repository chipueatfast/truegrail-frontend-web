import TruffleContract from 'truffle-contract';
import web3Provider from '~/MetaMask';
import request, { API } from '~/utils/request';

import test from './TrueGrailToken.json';


async function TrueGrailTokenJS() {
    const TrueGrailToken = await request({
        url: API().contract('truegrailtoken'),
        method: 'GET',
    });
    const TrueGrailTokenContract = TruffleContract(test);
    TrueGrailTokenContract.setProvider(web3Provider.currentProvider);
    TrueGrailTokenContract.defaults({from: web3Provider.eth.defaultAccount});
    return TrueGrailTokenContract.deployed();
}

export default TrueGrailTokenJS;