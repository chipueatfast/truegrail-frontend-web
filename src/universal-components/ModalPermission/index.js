import React from 'react';
import web3Provider from '~/MetaMask';
import Button from '@material-ui/core/Button';
import { Container, Content, Actions } from './styled';
import panelStore from '~/stores/panelStore';

export const addOrChangeAccount = async () => {
    const account = await window.ethereum.enable();
    const defaultAccount = account[0];
    web3Provider.eth.defaultAccount = defaultAccount;
}

function AccountPermissionModal({
    message, 
    onAcceptCallback, 
    close = panelStore.closeModal,
}) {
    return (
        <Container>

            <Content>
                {message}
            </Content>
            <Actions>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={
                        async () => {
                            await addOrChangeAccount();
                            onAcceptCallback();
                        }
                    }
                >
                    Accept
                </Button>
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => close()}
                >
                    Deny
                </Button>
            </Actions>
        </Container>
    )
}

export default AccountPermissionModal;