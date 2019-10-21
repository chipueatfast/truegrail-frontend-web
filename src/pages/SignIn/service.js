import React from 'react';
import trueGrailTokenContract from '~/singletons/trueGrailTokenContract';
import web3Provider from '~/singletons/web3Provider';
import request, { API } from '~/utils/request';
import history from '~/utils/history';
import userStore from '~/stores/userStore';
import panelStore from '~/stores/panelStore';
import { AlertModal } from '~/tg-ui';

export const addOrChangeAccount = () => {
    window.ethereum.enable().then(async (account) => {
        const defaultAccount = account[0];
        web3Provider().eth.defaultAccount = defaultAccount;
        userStore.updateUserProperty('address', defaultAccount);
        const creatorAddress = await trueGrailTokenContract().getCreator();
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