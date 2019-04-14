import web3Provider from '../MetaMask';
import request, { API } from '../utils/request';
import history from '../utils/history';
import userStore from '../userStore';

export const addOrChangeAccount = () => {
    window.ethereum.enable().then(async (account) => {
        const defaultAccount = account[0];
        web3Provider.eth.defaultAccount = defaultAccount;
        const contract = await request({
            url: API.getContractCreator('truegrailtoken'),
            method: 'GET',
        });
        if (contract.creator === account[0]) {
            userStore.updateUserProperty('role', 'creator');
            history.push('/creator');
            return;
        }

        const factory = await request({
            url: API.getContract(account[0]),
            method: 'GET',
        });

        if (factory && factory.status) {
            userStore.updateUserProperty('role', 'factory');
            history.push('/creator');
        }

    })
}