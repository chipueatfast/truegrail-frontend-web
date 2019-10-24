import React from 'react';
import trueGrailTokenContract from '~/singletons/trueGrailTokenContract';

import request, { API } from '~/utils/request';
import panelStore from '~/stores/panelStore';
import web3Provider from '~/singletons/web3Provider';
import { getItemFromStorage } from '~/utils/localStorage';
 
import ModalPermission from '~/universal-components/ModalPermission';


export const showAddFactoryPermissionModal = async (address, brand) => {
    const rs = await request({
        url: API().getFactory(address),
        method: 'GET',
    });
    if (!rs.err) {
        panelStore.showNotice({
            _message: 'The factory has already been added before',
            _variant: 'error',
            _duration: 5000,
        });
        return;
    }

    panelStore.showModal({
        _modalTitle: 'Add factory',
        _renderModalContent: () => (
            <ModalPermission
                message="Are you sure you want to add this address as a factory?"
                onAcceptCallback={() => addFactory(address, brand)}
            />
        )
    }
    )
}

export const addFactory = async (address, brand) => {
    try {
        console.log(trueGrailTokenContract());
        debugger
        await trueGrailTokenContract().addFactory(address, {
            from: getItemFromStorage('user').address,
        });
        const rs = await request({
            url: API().createFactory(),
            method: 'POST',
            body: {
                blockchainAddress: address,
                brand,
            },
        });
        if (!rs.err) {
            panelStore.showNotice({
                _message: 'The factory has been added',
                _variant: 'info',
                _duration: 5000,
            });
            panelStore.closeModal();
        }
    } catch(e) {
        console.log(e);
    }  

    
}