import trueGrailTokenContract from '~/singletons/trueGrailTokenContract';
import request, { API } from '~/utils/request';

export const claimSneaker = async (address, sneakerId) => {
    if (trueGrailTokenContract()) {
        const ownerAddress = await trueGrailTokenContract().ownerOf(sneakerId);
        if (address === ownerAddress) {
            console.log('You are the owner of this sneaker');
        }
        trueGrailTokenContract().Transfer({
            _to: address,
            _tokenId: sneakerId,
        }).on('data',(e) => {
            if (e.returnValues) {
                setTimeout(async () => {
                    const checkInfo = await request({
                        url: API().getSneakerInfoAndHash(e.returnValues._tokenId),
                        method: 'GET',
                    });
                    console.log('check ', checkInfo);
                    if (checkInfo.hash === e.returnValues.newHash) {
                        console.log('The transaction pulled off~!');
                    }
                }, 3000);
            }
        })
    }
}