import React from 'react';
import TrueGrailTokenContract from '~/contracts/TrueGrailToken';

import request, { API } from '~/utils/request';
import panelStore from '~/stores/panelStore';
import web3Provider from '~/MetaMask';
 
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
    const instance = await TrueGrailTokenContract();

    try {
        const ethCall = await instance.addFactory(address, {
            from: web3Provider.eth.defaultAccount
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