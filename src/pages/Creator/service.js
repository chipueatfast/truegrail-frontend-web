import React from 'react';
import trueGrailTokenContract from '~/singletons/trueGrailTokenContract';

// import request, { API } from '~/utils/request';
import panelStore from '~/stores/panelStore';
import { callSmartContractMethod } from '~/utils/smartContract';
import ModalPermission from '~/universal-components/ModalPermission/index';
import { closeModal } from '~/utils/modal';

import { asyncTryCatchReq } from '~/utils/customAxios';
import API from '~/api';



// export const showAddFactoryPermissionModal = async (address, brand) => {
//     const rs = await request({
//         url: API().getFactory(address),
//         method: 'GET',
//     });
//     if (!rs.err) {
//         panelStore.showNotice({
//             _message: 'The factory has already been added before',
//             _variant: 'error',
//             _duration: 5000,
//         });
//         return;
//     }

//     panelStore.showModal({
//         _modalTitle: 'Add factory',
//         _renderModalContent: () => (
//             <ModalPermission
//                 message="Are you sure you want to add this address as a factory?"
//                 onAcceptCallback={(privateKey) => {
//                     addFactoryHandler(privateKey, address, brand)
//                 }}
//             />
//         )
//     }
//     )
// }

// export const addFactoryHandler = async (privateKey, address, brand) => {
//     try {
//         const method = trueGrailTokenContract().methods.addFactory(address);
//         await callSmartContractMethod({
//             privateKey,
//             method,
//         })
//         debugger
//         const rs = await request({
//             url: API().createFactory(),
//             method: 'POST',
//             body: {
//                 blockchainAddress: address,
//                 brand,
//             },
//         });
//         if (!rs.err) {
//             panelStore.showNotice({
//                 _message: 'The factory has been added',
//                 _variant: 'info',
//                 _duration: 5000,
//             });
//             panelStore.closeModal();
//         }
//     } catch(e) {
//         closeModal();
//         panelStore.showNotice({
//             _message: e.message,
//             _variant: 'error',
//             _duration: 5000,
//         });
//     }  

    
// }


export function addFactoryFromCreator(factory) {
    const [err, rs] = asyncTryCatchReq({
        method: 'post',
        url: API().addFactory(),
        data: {
            ...factory,
            role: 'factory',
            password: '1',
        },
    });
}