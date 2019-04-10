import web3Provider from '../MetaMask';

export const addOrChangeAccount = () => {
    window.ethereum.enable().then(account => {
        const defaultAccount = account[0];
        web3Provider.eth.defaultAccount = defaultAccount;
    })
}