import React from 'react';
import trueGrailTokenContract from '~/singletons/trueGrailTokenContract';
import userStore from '~/stores/userStore';
import { showModal, closeModal, showAlertModal } from '~/utils/modal';
import { showNotice } from '~/utils/notice';
import { hashUnorderedJSON } from '~/pages/Factory/service';
import request, { API } from '~/utils/request';
import TransferModal from './TransferModal';
import collectionStore from './stores/collectionStore';


export const checkOwnership = async (id) => {
    const tokenOwner = await trueGrailTokenContract().ownerOf(id);
    return tokenOwner.toLowerCase() === userStore.address;
}

export const transferSneaker = async (sneakerInfo, toAddress) => {
    const {
        id,
    } = sneakerInfo;
    request({
        url: API().changeOwnership(),
        method: 'PATCH',
        body: {
            sneakerId: sneakerInfo.id,
            newAddress: toAddress,
        }
    }).then(rs => {
        if (rs.status) {
            collectionStore.removeSneaker(sneakerInfo.id, toAddress);
            closeModal();
        }
    });
    if (trueGrailTokenContract()) {
        sneakerInfo.ownerAddress = toAddress;

        trueGrailTokenContract().transfer(toAddress, id, hashUnorderedJSON(sneakerInfo), {
            from: userStore.address,
        }).on('error', (e) => {
            if (e.message.search('User denied transaction signature.') !== -1) {
                showNotice('info', 'You canceled the transaction');
            }
            if (e.message.search('Sender is not authorized') !== -1) {
                showAlertModal('This sneaker is no longer belogn to you');
                closeModal();
            }
        });
    }
}

export const showTransferModal = (sneakerInfo) => {
    showModal(
        'Change ownership',
        () => (<TransferModal sneakerId={sneakerInfo} />)
    )
}