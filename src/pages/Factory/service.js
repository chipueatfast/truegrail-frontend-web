
import React from 'react';
import randomBytes from 'randombytes';
import SHA256 from 'crypto-js/sha256';
import request, { API } from 'utils/request';
import { showNotice } from '~/utils/notice';
import ModalPermission from '~/universal-components/ModalPermission/index';
import { showModal, closeModal } from '~/utils/modal';
import { createCorrespondingSneakerHash, generateKeyPair, generateRandomEosAccountName } from '~/utils/eosio';
import { getItemFromStorage } from '~/utils/localStorage';

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
   
    if (true) {
        try {
            // console.log(toJS(sneakerInfo));
            const hash = hashUnorderedJSON(sneakerInfo);
            closeModal();
        } catch(e) {
            console.log(e);
            showNotice('error', e.message, 5000);
            onError();
        }
    }
}

function generateSneakerId() {
    return randomBytes(6).readUIntBE(0, 6);
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

export async function generateStampDetail(batchInfo) {
    const user = getItemFromStorage('user');
    const id = generateSneakerId();
    const hash = createCorrespondingSneakerHash({
        ...batchInfo,
        issuerId: user.id,
    });
    const eosName = generateRandomEosAccountName();
    const {
        privateKey,
        publicKey,
    } = await generateKeyPair();
    console.log(privateKey, publicKey);
    return {
        id,
        hash,
        eosCreds: {
            privateKey,
            publicKey,
            eosName,
        },
    };
}