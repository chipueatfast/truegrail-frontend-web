import Web3 from 'web3';
// import ganache from 'ganache-cli';

let web3Provider;

if (window.ethereum) {
    const ethereum = window.ethereum;
    // web3Provider = new Web3(new Web3.providers.HttpProvider(ganache.provider()));
    web3Provider = new Web3(ethereum);
}


export default web3Provider;