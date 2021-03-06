import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import SneakerStamp from '~/assets/img/sneaker_stamp.png'
import { showRequiringPasswordModal, closeModal } from '~/utils/modal';
import IssueStepper from './IssueStepper/index';
import { Container, IssueActionBox, ActionContainer } from './styled';
import panelStore from '~/stores/panelStore';
import { showNotice } from '~/utils/notice';
import IssuedDashboardMiniature from '~/assets/img/miniature/issuedDashboard.png';
import { authenticateIssuingSneaker } from './service';
import IssuedDashboard from './IssuedDashboard/index';



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
            <ActionContainer>
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
                <IssueActionBox>
                    <img
                        alt='miniature'
                        src={IssuedDashboardMiniature}
                    />
                    <Button
                        onClick={() => {
                            setComponent(2);
                        }}
                        variant='contained'
                    >
                        Go to issued dashboard
                    </Button>
                </IssueActionBox>
            </ActionContainer>
            }
            {
                component === 1 &&
                <IssueStepper
                    password={password}
                />
            }
            {
                component === 2 &&
                <IssuedDashboard
                />
            }
        </Container>
    );
}

export default Factory;