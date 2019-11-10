
import React from 'react';
import randomBytes from 'randombytes';
import SHA256 from 'crypto-js/sha256';
import request, { API } from 'utils/request';
import { showNotice } from '~/utils/notice';
import trueGrailTokenContract from '~/singletons/trueGrailTokenContract';
import { callSmartContractMethod } from '~/utils/smartContract';
import ModalPermission from '~/universal-components/ModalPermission/index';
import { showModal, closeModal } from '~/utils/modal';

export const notifyNewSneaker = async (sneakerId) => {
    showNotice('info',`Successfully issued sneaker no.${sneakerId}`);
}

export function showIssueSneakerPermissionModal(issueSneakerParams) {
    showModal(
        'Issue sneaker',
        () => (
            <ModalPermission
                message="Provide Private Key"
                onAcceptCallback={(privateKey) => {
                    issueSneakerHandler({privateKey, ...issueSneakerParams})
                }}
            />
        ));
}

export async function issueSneakerHandler({privateKey, id, batchInfo, onSuccess, onError}) {
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
            const method = trueGrailTokenContract().methods.issueToken(id, hash);
            const tx = await callSmartContractMethod({
                method,
                privateKey,
            })
            closeModal();
            onSuccess(tx);
        } catch(e) {
            console.log(e);
            showNotice('error', e.message, 5000);
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
    orderedObject.ownerAddress = orderedObject.ownerAddress.toLowerCase();
    return orderedObject;
}

export function hashUnorderedJSON(sneaker) {
    const orderedObject = sortToGivenOrder(sneaker);
    const hashInfo = SHA256(JSON.stringify(orderedObject)).toString();
    return hashInfo;
}