import React from 'react';
import trueGrailTokenContract from '~/singletons/trueGrailTokenContract';
import userStore from '~/stores/userStore';
import { showModal, closeModal, showAlertModal } from '~/utils/modal';
import { showNotice } from '~/utils/notice';
import request, { API } from '~/utils/request';
import TransferModal from './TransferModal/index';
import collectionStore from './stores/collectionStore';
import { callSmartContractMethod } from '~/utils/smartContract';
import ModalPermission from '~/universal-components/ModalPermission/index';


export const checkOwnership = async (id) => {
    const tokenOwner = await callSmartContractMethod({
        method: trueGrailTokenContract().methods.ownerOf(id),
        isPureGet: true,
    });
    return tokenOwner === userStore.address;
}

// export function showTransferSneakerPermissionModal({sneakerInfo, toAddress}) {
//     console.log(sneakerInfo, toAddress);
//     showModal('Transfer Sneaker', () => (
//         <ModalPermission
//             onAcceptCallback={(privateKey) => transferSneakerHandler({privateKey, sneakerInfo, toAddress})}
//         />
//     ))
// }

// export const transferSneakerHandler = async ({privateKey, sneakerInfo, toAddress}) => {
//     try {
//         const {
//             id,
//         } = sneakerInfo;
//         request({
//             url: API().changeOwnership(),
//             method: 'PATCH',
//             body: {
//                 sneakerId: sneakerInfo.id,
//                 newAddress: toAddress,
//             }
//         }).then(rs => {
//             if (rs.status) {
//                 collectionStore.removeSneaker(sneakerInfo.id, toAddress);
//                 closeModal();
//             }
//         });
    
//         sneakerInfo.ownerAddress = toAddress;
//         const method = trueGrailTokenContract().methods.transfer(toAddress, id, hashUnorderedJSON(sneakerInfo));
//         await callSmartContractMethod({
//             method,
//             privateKey,
//         })
//     } catch(e) {
//         if (e.message.search('Sender is not authorized') !== -1) {
//             showAlertModal('This sneaker is no longer belogn to you');
//             closeModal();
//             return;
//         }
//         showNotice('error', e.message);
//     }

// }

export const showTransferModal = (sneakerInfo) => {
    showModal(
        'Change ownership',
        () => (<TransferModal sneakerInfo={sneakerInfo} />)
    )
}