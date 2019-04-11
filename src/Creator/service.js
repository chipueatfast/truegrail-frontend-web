import React from 'react';
import TrueGrailTokenContract from '../contracts/TrueGrailToken';

import request, { API } from '../utils/request';
import panelStore from '../panelStore';
import web3Provider from '../MetaMask';
 
import ModalPermission from '../ModalPermission';


export const showAddFactoryPermissionModal = (address, brand) => {
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
    const rs = await request({
        url: API().getFactory(address),
        method: 'GET',
    });
    if (rs && rs.err && rs.err.response && rs.err.response.status === 404) {
        try {
            await instance.addFactory(address, {
                from: web3Provider.eth.defaultAccount
            });
            const rs = await request({
                url: API().addFactory(),
                method: 'POST',
                body: {
                    blockchainAddress: address,
                    brand,
                },
            });
            if (!rs.err) {

            }
        } catch(e) {
            console.log(e);
            panelStore.showNotice({
                _message: 'The factory has been added',
                _variant: 'info',
                _duration: 5000,
            })
        }  
    } else {
        panelStore.showNotice({
            _message: 'The factory has already been added',
            _variant: 'error',
            _duration: 5000,
        })
    }
    
}