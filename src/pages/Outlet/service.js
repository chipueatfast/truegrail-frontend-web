import React from 'react';
import userStore from '~/stores/userStore';
import contractStore from '~/stores/contractStore';
import collectionStore from './stores/collectionStore';

import { showModal, closeModal, showAlertModal } from '~/utils/modal';
import { showNotice } from '~/utils/notice';

import TransferModal from './TransferModal';

export const checkOwnership = async (id) => {
    const contractInstance = await contractStore.getTrueGrailInstance();
    if (contractInstance) {
        const tokenOwner = await contractInstance.ownerOf(id);
        console.log(id, tokenOwner, userStore.address);
        return tokenOwner.toLowerCase() === userStore.address;
    }
}

export const transferSneaker = async (id, toAddress) => {
    const instance = await contractStore.getTrueGrailInstance();
    if (instance) {
        const transferEvent = instance.Transfer({
            _tokenId: id,
        });


        transferEvent.on('data', e => {
            collectionStore.removeSneaker(e.returnValues._tokenId, e.returnValues._to);
            
            closeModal();
        });

        instance.transfer(toAddress, id, {
            from: userStore.address,
        }).on('error', (e) => {
            if (e.message.search('User denied transaction signature.') !== -1) {
                showNotice('info', 'You canceled the transaction');
            }
            if (e.message.search('Sender is not authorized') !== -1) {
                showAlertModal('This sneaker is longer belogn to you');
                closeModal();
            }
        });
    }
}

export const showTransferModal = (sneakerId) => {
    showModal(
        'Change ownership',
        () => (<TransferModal sneakerId={sneakerId} />)
    )
}