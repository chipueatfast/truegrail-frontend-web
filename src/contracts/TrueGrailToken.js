import TruffleContract from 'truffle-contract';
import TrueGrailToken from '../contracts/TrueGrailToken.json';
import web3Provider from '../MetaMask';


function TrueGrailTokenJS() {
    const TrueGrailTokenContract = TruffleContract(TrueGrailToken);
    TrueGrailTokenContract.setProvider(web3Provider.currentProvider);
    TrueGrailTokenContract.defaults({from: web3Provider.eth.defaultAccount});
    return TrueGrailTokenContract;
}

export default TrueGrailTokenJS();