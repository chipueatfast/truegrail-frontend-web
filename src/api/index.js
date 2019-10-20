export default () => {
    const server = process.env.NODE_ENV === 'production' ? 'http://128.199.134.167' : 'http://localhost:2190';
    
    return ({
        contract: (contractName) => `${server}/contract/`,
        getFactory: (address) => `${server}/factory/${address}`,
        createFactory: () => `${server}/factory`,
        getSneakerInfoAndHash: (id) => `${server}/sneaker/${id}`,
        sneaker: () => `${server}/sneaker`,
        sneakerCollection: (address) => `${server}/user/ownership/${address}`,
        changeOwnership: () => `${server}/sneaker/ownership`,
        
    })
}