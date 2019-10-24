import request, { API } from '~/utils/request';

let trueGrailTokenContract;

const networkId = {
    development: '5777',
    production: '5777',
}

export async function initTrueGrailTokenContract(web3Provider) {
    const TrueGrailTokenJSON = await request({
        url: API().contract(),
        method: 'GET',
    });
    const {
        abi,
        networks: {
            [networkId[process.env.NODE_ENV]]: {
                address,
            },
        }
    } = TrueGrailTokenJSON;
    trueGrailTokenContract = new web3Provider.eth.Contract(abi, address);
}

const getTrueGrailTokenContract = () => trueGrailTokenContract;

export default getTrueGrailTokenContract;
