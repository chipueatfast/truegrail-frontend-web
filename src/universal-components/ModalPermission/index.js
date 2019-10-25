import React from 'react';
import { Formik } from 'formik';
import web3Provider from '~/singletons/web3Provider';
import { TextField, Button } from '@material-ui/core';
import { Container, Content, Actions } from './styled';
import panelStore from '~/stores/panelStore';
import { showNotice } from '~/utils/notice';

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

            <Formik
                initialValues={{
                    privateKey: '',
                }}
                onSubmit={({ privateKey }, { setSubmitting }) => {
                    setSubmitting(true);
                    try {
                        onAcceptCallback(privateKey);
                    } catch(e) {
                        showNotice(
                            'error',
                            e.message,
                            5000
                        );
                    }
                    return;
                }}
                render={({
                    values,
                    handleChange,
                    handleSubmit,
                }) => {
                    return (
                        <>
                            <Content>
                                <span>
                                    {message || 'please provide private key'}
                                </span>  
                                <TextField
                                    onChange={handleChange}
                                    name='privateKey'
                                    label='Private Key'
                                    type='password'
                                    value={values.privateKey}
                                />
                            </Content>
                            <Actions>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={handleSubmit}
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
                        </>
                    )
                }}
            />
            
        </Container>
    )
}

export default AccountPermissionModal;