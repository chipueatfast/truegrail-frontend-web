import React from 'react';
import Button from '@material-ui/core/Button';
import { Container } from './styled'; 
import panelStore from '~/stores/panelStore';


function AlertModal(props) {
    const {
        announcement,
    } = props;
    return (
        <Container>
            {announcement}
            <Button
                color='primary'
                onClick={() => panelStore.closeModal()}
                variant='contained'
            >
                OK
            </Button>
        </Container>
    );
}

export default AlertModal