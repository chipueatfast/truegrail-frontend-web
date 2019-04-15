import web3Provider from '~/MetaMask';
import request, { API } from '~/utils/request';
import history from '~/utils/history';
import userStore from '~/stores/userStore';

export const addOrChangeAccount = () => {
    window.ethereum.enable().then(async (account) => {
        const defaultAccount = account[0];
        web3Provider.eth.defaultAccount = defaultAccount;
        const contract = await request({
            url: API().getContractCreator('truegrailtoken'),
            method: 'GET',
        });
        userStore.updateUserProperty('address', defaultAccount);
        if (contract.creator.toLowerCase() === account[0]) {
            userStore.updateUserProperty('role', 'creator');
            history.push('/creator');
            return;
        }

        console.log(account[0])

        const factory = await request({
            url: API().getFactory(account[0]),
            method: 'GET',
        });

        if (factory && !factory.err) {
            userStore.updateUserProperty('role', 'factory');
            history.push('/factory');
        }

    })
}