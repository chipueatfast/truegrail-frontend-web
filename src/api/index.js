export default () => {
    const server = process.env.NODE_ENV === 'production' ? 'http://128.199.134.167' : 'http://localhost:2190';
    
    return ({
        contract: (contractName) => `${server}/contract/${contractName}`,
        getFactory: (address) => `${server}/factory/${address}`,
        createFactory: () => `${server}/factory`,
        getContractCreator: (contractName) => `${server}/contract/creator/${contractName}`,
        getSneakerInfoAndHash: (id) => `${server}/sneaker/${id}`,
        sneaker: () => `${server}/sneaker`,
        sneakerCollection: (address) => `${server}/user/ownership/${address}`,
        changeOwnership: () => `${server}/sneaker/ownership`,
        
    })
}