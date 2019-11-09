
export const server = process.env.NODE_ENV === 'production' ? 'http://128.199.134.167' : 'http://localhost:2190';

// export default () => {
//     return ({
//         // POST
//         signIn: () => `${server}/signin/`,
//         contract: (contractName) => `${server}/contract/`,
//         getFactory: (address) => `${server}/factory/${address}`,
//         createFactory: () => `${server}/factory`,
//         getSneakerInfoAndHash: (id) => `${server}/sneaker/${id}`,
//         sneaker: () => `${server}/sneaker`,
//         sneakerCollection: (address) => `${server}/user/ownership/${address}`,
//         changeOwnership: () => `${server}/sneaker/ownership`,
        
//     })
// }

export default () => {
    return ({
        // POST
        signIn: () => '/user/signin/',
        contract: (contractName) => '/contract/',
        getFactory: (address) => `/factory/${address}`,
        // POST
        addFactory: () => `/factory/`,
        createFactory: () => '/factory',
        getSneakerInfoAndHash: (id) => `/sneaker/${id}`,
        sneaker: () => '/sneaker',
        sneakerCollection: (address) => `/user/ownership/${address}`,
        changeOwnership: () => '/sneaker/ownership',
        
    })
}