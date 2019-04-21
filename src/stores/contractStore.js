import { observable, action } from 'mobx';
import request, { API } from '~/utils/request';
import TruffleContract from 'truffle-contract';
import web3Provider from '~/MetaMask';

import panelStore from '~/stores/panelStore';


class ContractStore {
    trueGrailInstance = observable.box(undefined);
    

    getTrueGrailInstance() {
        if (!this.trueGrailInstance) {
            panelStore.showNotice({
                _message: 'Contract is not ready',
                _variant: 'error',
                _duration: 5000,
            })
        }
        return this.trueGrailInstance.get();
    }

    @action.bound
    async fetchTrueGrailInstance() {
        const TrueGrailToken = await request({
            url: API().contract('truegrailtoken'),
            method: 'GET',
        });
        const TrueGrailTokenContract = TruffleContract(JSON.parse(TrueGrailToken.jsonContent));
        TrueGrailTokenContract.setProvider(web3Provider.currentProvider);
        TrueGrailTokenContract.defaults({from: web3Provider.eth.defaultAccount});
        this.trueGrailInstance.set(await TrueGrailTokenContract.deployed());
    }
}

export default new ContractStore();
