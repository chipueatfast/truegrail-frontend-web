import React from 'react';
import Button from '@material-ui/core/Button';

import userStore from '~/stores/userStore';
import vansLogo from '~/assets/img/vans_logo.jpg';

import { Container } from './styled';

class Header extends React.Component {
    render() {
        return (
            <Container>
                 <img src={vansLogo} 
                    style={{
                    height: 100,
                    width: 100,
                    }} 
                    alt='logo'
                />
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