import contractStore from '~/stores/contractStore';

export const claimSneaker = async (address, sneakerId) => {
    const instance = contractStore.getTrueGrailInstance();
    if (instance) {
        const ownerAddress = await instance.ownerOf(sneakerId);
        if (address === ownerAddress) {
            console.log('You are the owner of this sneaker');
        }
        instance.Transfer({
            _to: address,
            _tokenId: sneakerId,
        }).on('data', (e) => {
            console.log(e);
            if (e.returnValues) {
                console.log('The transaction pulled off~!');
            }
        })
    }
}