import React from 'react';
import Button from '@material-ui/core/Button';
import history from '~/utils/history';

import userStore from '~/stores/userStore';
import panelStore from '~/stores/panelStore';
import headerLogo from '~/assets/img/truegrail_header_logo.png';

import { observer } from 'mobx-react';
import { Container } from './styled';

@observer
class Header extends React.Component {
    
    render() {
        return (
            <Container>
                 <img 
                    src={headerLogo}
                    onClick={() => history.push('/')}
                    style={{
                        width: 256,
                        objectFit: 'contain',
                        padding: 12,
                        marginLeft: 48,

                    }} 
                    alt='logo'
                />
                <h1>
                    {panelStore.currentPage.get()}
                </h1>
                <Button
                    className='signout-btn'
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