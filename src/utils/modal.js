import React from 'react';
import panelStore from '~/stores/panelStore';
import { AlertModal } from 'tg-ui';

import LinearProgress from '@material-ui/core/LinearProgress';

export function showModalComponent({
    modalTitle,
    renderModalContent,
}) {
    panelStore.showModal({
        _modalTitle: modalTitle,
        _renderModalContent: renderModalContent,
    })
}

export const showModal = (
    _modalTitle,
    _renderModalContent,
) => {
    panelStore.showModal({
        _modalTitle,
        _renderModalContent,
    })
}

export const showAlertModal = (message) => {
    panelStore.showModal({
        _modalTitle: 'Alert',
        _renderModalContent: () => <AlertModal announcement={message} />
    })
}

export const closeModal = () => {
    panelStore.closeModal();
}

export const showLinear = () => {
    panelStore.showModal({
        _renderModalContent: () => {
            return (
                <div
                    style={
                        {
                            width: 300,
                            height: 200,
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }
                    }
                >   
                    <LinearProgress />
                    <LinearProgress color='secondary'/>

                </div>
            )
        }
    })
}