import React from 'react';
import web3Provider from '~/MetaMask';
import request, { API } from '~/utils/request';
import history from '~/utils/history';
import userStore from '~/stores/userStore';
import panelStore from '~/stores/panelStore';
import contractStore from '~/stores/contractStore';
import { AlertModal } from '~/tg-ui';

export const addOrChangeAccount = () => {
    window.ethereum.enable().then(async (account) => {
        const defaultAccount = account[0];
        web3Provider.eth.defaultAccount = defaultAccount;
        userStore.updateUserProperty('address', defaultAccount);
        const creatorAddress = await contractStore.getTrueGrailInstance().getCreator();
        if (creatorAddress.toLowerCase() === account[0]) {
            userStore.updateUserProperty('role', 'creator');
            history.push('/creator');
            return;
        }


        const factory = await request({
            url: API().getFactory(account[0]),
            method: 'GET',
        });

        if (factory && !factory.err) {
            userStore.updateUserProperty('role', 'factory');
            history.push('/factory');
            return;
        }
        
        panelStore.showModal({
            _modalTitle: 'Alert',
            _renderModalContent: () => <AlertModal announcement='Indentity not found' />
        })
    })
}