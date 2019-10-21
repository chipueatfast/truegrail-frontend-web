
import randomBytes from 'randombytes';
import SHA256 from 'crypto-js/sha256';
import userStore from '~/stores/userStore';
import request, { API } from 'utils/request';
import { showNotice } from '~/utils/notice';
import trueGrailTokenContract from '~/singletons/trueGrailTokenContract';


export async function issueSneaker(id, batchInfo, onSuccess, onError) {
    const sneakerInfo = {
        id,
        ...batchInfo,
    };

    request({
        url: API().sneaker(),
        method: 'POST',
        body: sneakerInfo,
    }).then(
        rs => {
            if (!rs.status) {
                showNotice('error', 'Can not issue this sneaker');
            }
        }
    );
   
    if (trueGrailTokenContract()) {
        try {
            // console.log(toJS(sneakerInfo));
            const hash = hashUnorderedJSON(sneakerInfo);
            const ethCall = await trueGrailTokenContract().issueToken(
                id, hash,
            {
                from: userStore.address,
            }).on('error', e => {

            });
            if (ethCall && ethCall.tx) {
                onSuccess(ethCall.tx);
            }
        } catch(e) {
            console.log(e);
            onError();
        }
    }
}

export function generateSneakerId(quantity) {
    let ids = [];
    for (let i = 0; i < quantity; i++) {
        ids.push(randomBytes(6).readUIntBE(0, 6));
    }
    return ids;
}

function sortToGivenOrder(object) {
    const orderedObject = {};
    const keys = ["id", "brand", "model", "colorway", "limitedEdition","releaseDate","size", "condition", "ownerAddress"];
    keys.forEach(key => {
        orderedObject[key] = object[key];
    });
    // console.log(object);
    // debugger
    orderedObject.ownerAddress = orderedObject.ownerAddress.toLowerCase();
    return orderedObject;
}

export function hashUnorderedJSON(sneaker) {
    const orderedObject = sortToGivenOrder(sneaker);
    const hashInfo = SHA256(JSON.stringify(orderedObject)).toString();
    return hashInfo;
}