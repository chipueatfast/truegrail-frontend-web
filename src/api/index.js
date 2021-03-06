
export const server = process.env.NODE_ENV === 'production' ? 'http://128.199.134.167' : 'http://localhost:2190';

export default () => {
    return ({
        // POST
        signIn: () => '/user/signin/',
        contract: (contractName) => '/contract/',
        getFactory: (address) => `/factory/${address}`,
        // POST
        addFactory: () => '/user/',
        // GET
        getAllFactories: () => '/factory/',
        getSneakerInfoAndHash: (id) => `/sneaker/${id}`,
        sneaker: () => '/sneaker',
        sneakerCollection: (address) => `/user/ownership/${address}`,
        changeOwnership: () => '/sneaker/ownership',

        getIssuedSneaker: (factoryId) => `/sneaker/factory/${factoryId}/`,
        // POST
        issueSneaker: (factoryId) => `/sneaker/factory/${factoryId}/`,
        getPasswordStatus: (userId) => `/user/password/default/${userId}/`,
        changePassword: (userId) => `/user/password/${userId}`,
        tracing: () => `/tracing/`,
    })
}