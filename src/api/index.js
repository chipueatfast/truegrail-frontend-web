

export default () => {
    const server = 'http://localhost:2190';
    return ({
        getFactory: (address) => `${server}/factory/${address}`,
        createFactory: () => `${server}/factory`,
    })
}