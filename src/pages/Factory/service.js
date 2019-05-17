
import randomBytes from 'randombytes';
import SHA256 from 'crypto-js/sha256';
import { toJS } from 'mobx';
import contractStore from '~/stores/contractStore';
import TrueGrailTokenContract from '~/contracts/TrueGrailToken';
import userStore from '~/stores/userStore';
import request, { API } from 'utils/request';
import { showNotice } from '~/utils/notice';


export async function issueSneaker(id, batchInfo, onSuccess, onError) {
    const sneakerInfo = {
        id,
        ...batchInfo,
    };

    const instance = await contractStore.getTrueGrailInstance();
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
   
    if (instance) {
        try {
            console.log(toJS(sneakerInfo));
            const hash = hashUnorderedJSON(sneakerInfo);
            const ethCall = await instance.issueToken(id, hash, {
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

export async function getFirstFactory() {
    const instance = await TrueGrailTokenContract();
    return instance.factories(0);
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
    return orderedObject;
}

export function hashUnorderedJSON(sneaker) {
    const orderedObject = sortToGivenOrder(sneaker);
    const hashInfo = SHA256(JSON.stringify(orderedObject)).toString();
    return hashInfo;
}