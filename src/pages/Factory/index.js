import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import SneakerStamp from '~/assets/img/sneaker_stamp.png'
import InfoInput from './InfoInput';
import IssueStepper from './IssueStepper';
import { Container, IssueActionBox } from './styled';
import panelStore from '~/stores/panelStore';



function Factory() {
    const [component, setComponent] = useState(0);

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
                            setComponent(1);
                        }}
                    >
                        Issue Sneakers
                    </Button>
            </IssueActionBox>
            }
            {
                component === 1 &&
                <IssueStepper />
            }
        </Container>
    );
}

export default Factory;