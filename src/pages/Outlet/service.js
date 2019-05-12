import React from 'react';
import userStore from '~/stores/userStore';
import contractStore from '~/stores/contractStore';
import { showModal, closeModal, showAlertModal } from '~/utils/modal';
import { showNotice } from '~/utils/notice';
import { hashUnorderedJSON } from '~/pages/Factory/service';
import TransferModal from './TransferModal';
import collectionStore from './stores/collectionStore';

export const checkOwnership = async (id) => {
    const contractInstance = await contractStore.getTrueGrailInstance();
    if (contractInstance) {
        const tokenOwner = await contractInstance.ownerOf(id);
        return tokenOwner.toLowerCase() === userStore.address;
    }
}

export const transferSneaker = async (sneakerInfo, toAddress) => {
    const {
        id,
    } = sneakerInfo;
    const instance = await contractStore.getTrueGrailInstance();
    if (instance) {
        const transferEvent = instance.Transfer({
            _tokenId: id,
        });


        transferEvent.on('data', e => {
            collectionStore.removeSneaker(e.returnValues._tokenId, e.returnValues._to);
            
            closeModal();
        });

        sneakerInfo.ownerAddress = toAddress;

        instance.transfer(toAddress, id, hashUnorderedJSON(id, sneakerInfo).hashInfo, {
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