import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

import { AlertModal } from 'tg-ui';
import panelStore from '~/stores/panelStore';

import RequiringPasswordModal from '~/universal-components/RequiringPasswordModal/index';


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

export function showRequiringPasswordModal({
    title,
    protectedCallback,
}) {
    showModalComponent({
        modalTitle: title,
        renderModalContent: () => (
            <RequiringPasswordModal
                protectedCallback={protectedCallback}
            />
        )
    })
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