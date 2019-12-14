import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import SneakerStamp from '~/assets/img/sneaker_stamp.png'
import { showRequiringPasswordModal, closeModal } from '~/utils/modal';
import IssueStepper from './IssueStepper/index';
import { Container, IssueActionBox } from './styled';
import panelStore from '~/stores/panelStore';
import { showNotice } from '~/utils/notice';
import { authenticateIssuingSneaker } from './service';

import DesignedStamp from './DesignedStamp';



function Factory() {
    const [component, setComponent] = useState(2);
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
            {
                component === 2 &&
                <DesignedStamp
                    id={181149779059064}
                    eosName='g3a5ega5355a'
                    infoHash='4ddcee01a38dcd9bb81a44a3549501e4bf77110380f39cd8711d0a10f8cd8e75'
                />
            }
        </Container>
    );
}

export default Factory;