import React from 'react';
import Button from '@material-ui/core/Button';

import userStore from '~/stores/userStore';
import panelStore from '~/stores/panelStore';
import vansLogo from '~/assets/img/vans_logo.jpg';

import { observer } from 'mobx-react';
import { Container } from './styled';
import { Typography } from '@material-ui/core';

@observer
class Header extends React.Component {
    
    render() {
        console.log(panelStore.currentPage.get());
        return (
            <Container>
                 <img src={vansLogo} 
                    style={{
                    height: 50,
                    width: 50,
                    }} 
                    alt='logo'
                />
                <Typography>
                    {panelStore.currentPage.get()}
                </Typography>
                <Button
                    color='secondary'
                    variant='contained'
                    onClick={userStore.logOut}
                >
                    Sign Out
                </Button>
            </Container>
        )
    }
}

export default Header;