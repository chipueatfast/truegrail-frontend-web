import TruffleContract from 'truffle-contract';
import web3Provider from '~/MetaMask';
import request, { API } from '~/utils/request';


async function TrueGrailTokenJS() {
    const TrueGrailToken = await request({
        url: API().contract(),
        method: 'GET',
    });
    const TrueGrailTokenContract = TruffleContract(JSON.parse(TrueGrailToken.jsonContent));
    TrueGrailTokenContract.setProvider(web3Provider.currentProvider);
    TrueGrailTokenContract.defaults({from: web3Provider.eth.defaultAccount});
    return TrueGrailTokenContract.deployed();
}

export default TrueGrailTokenJS;