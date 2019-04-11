import Web3 from 'web3';

let web3Provider;

if (window.ethereum) {
    const ethereum = window.ethereum;
    web3Provider = new Web3(ethereum);
    ethereum.enable().then(account => {
        const defaultAccount = account[0];
        web3Provider.eth.defaultAccount = defaultAccount;
    })
}


export default web3Provider;