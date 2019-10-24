import React from 'react';
import trueGrailTokenContract from '~/singletons/trueGrailTokenContract';
import web3Provider from '~/singletons/web3Provider';
import request, { API } from '~/utils/request';
import history from '~/utils/history';
import userStore from '~/stores/userStore';
import panelStore from '~/stores/panelStore';
import { AlertModal } from '~/tg-ui';

import { callSmartContractMethod } from '~/utils/smartContract';

export const addOrChangeAccount = async (account) => {
        userStore.updateUserProperty('address', account);
        const creatorAddress = await callSmartContractMethod({
            isPureGet: true,
            method: trueGrailTokenContract().methods.getCreator(),
        })
        console.log(creatorAddress);
        if (creatorAddress === account) {
            userStore.updateUserProperty('role', 'creator');
            history.push('/creator');
            return;
        }


        const factory = await request({
            url: API().getFactory(account),
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
}