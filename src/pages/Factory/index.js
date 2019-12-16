import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import SneakerStamp from '~/assets/img/sneaker_stamp.png'
import { showRequiringPasswordModal, closeModal } from '~/utils/modal';
import IssueStepper from './IssueStepper/index';
import { Container, IssueActionBox } from './styled';
import panelStore from '~/stores/panelStore';
import { showNotice } from '~/utils/notice';
import { authenticateIssuingSneaker } from './service';



function Factory() {
    const [component, setComponent] = useState(0);
    const [password, setPassword] = useState('');

    useEffect(() => {
        panelStore.currentPage.set('FACTORY');
    }, []);

    return (
        <Container>
            {
            component === 0 &&
            <IssueActionBox>
                    <img
                        src={SneakerStamp}
                        alt='sneaker_stamp'
                    />
                    <Button
                        variant='contained'
                        onClick={() => {
                            showRequiringPasswordModal({
                                title: 'Issue sneaker',
                                protectedCallback: async (password) => {
                                    const {
                                        error,
                                    } = await authenticateIssuingSneaker(password);
                                    if (error) {
                                        showNotice('error', error);
                                        closeModal();
                                        return;
                                    }
                                    setPassword(password);
                                    setComponent(1);
                                    closeModal();
                                }
                            });
                        }}
                    >
                        Issue Sneakers
                    </Button>
            </IssueActionBox>
            }
            {
                component === 1 &&
                <IssueStepper
                    password={password}
                />
            }
        </Container>
    );
}

export default Factory;