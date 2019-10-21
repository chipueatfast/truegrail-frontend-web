import request, { API } from '~/utils/request';
import TruffleContract from 'truffle-contract';

let trueGrailTokenContract;

export async function initTrueGrailTokenContract(web3Provider) {
    const TrueGrailTokenJSON = await request({
        url: API().contract(),
        method: 'GET',
    }).then();
    const TrueGrailTokenContract = TruffleContract(TrueGrailTokenJSON);
    TrueGrailTokenContract.setProvider(web3Provider.currentProvider);
    trueGrailTokenContract = await TrueGrailTokenContract.deployed();
}

const getTrueGrailTokenContract = () => trueGrailTokenContract;

export default getTrueGrailTokenContract;
