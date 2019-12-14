import React from 'react';
import history from '~/utils/history';

import userStore from '~/stores/userStore';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import headerLogo from '~/assets/img/truegrail_header_logo.png';

import VansLogo from '~/assets/img/logo/vans.svg';
import NikeLogo from '~/assets/img/logo/nike.svg';
import AdidasLogo from '~/assets/img/logo/adidas.svg';

import { observer } from 'mobx-react';
import { Container, LogoContainer, ActionContainer } from './styled';
import { getBrand, getRole } from '~/utils/localStorage';
import { checkIfStillUsingDefaultPassword } from './service';


const logos = {
    vans: VansLogo,
    nike: NikeLogo,
    adidas: AdidasLogo,
}

@observer
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultPassword: false,
        };
    }

        
    componentDidMount() {
        checkIfStillUsingDefaultPassword().then(rs => {
            this.setState({
                defaultPassword: rs,
            })
        });
    }

    getIssuerLogo() {
        return logos[getBrand()];
    }

    wrapProfileButton(children) {
        return (
            <Tooltip title="You are still using default password">
                <Badge
                    color="secondary"
                    badgeContent='!'
                    overlap='circle'
                    anchorOrigin={{
                        horizontal: 'left',
                        vertical: 'top',
                    }}
                >
                    {children}
                </Badge>
            </Tooltip>
        )
    }

    render() {
        const {
            defaultPassword,
        } = this.state;
        return (
            <Container>
                <LogoContainer>
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
                    {
                        getRole() === 'factory' && (
                            <>
                                <h1> + </h1>
                                <img
                                    alt='issuer'
                                    src={this.getIssuerLogo()}
                                    style={{
                                        height: 50,
                                        objectFit: 'contain',
                                        padding: 12,
                                    }} 
                                />
                            </>
                        )
                    }
                </LogoContainer>
                <ActionContainer>
                    <IconButton
                        onClick={() => history.push('/profile')}
                    >
                        {
                            defaultPassword ? 
                            this.wrapProfileButton(
                                <AccountCircleIcon
                                    fontSize="large"
                                    variant='contained'
                                    color='primary'
                                />) :
                            <AccountCircleIcon
                                fontSize="large"
                                variant='contained'
                                color='primary'
                            />
                        }
                    </IconButton>
                    <IconButton
                        onClick={userStore.logOut}
                    >
                        <ExitToAppIcon
                            fontSize="large"
                            variant='outlined'
                            color='secondary'
                        />
                    </IconButton>
                </ActionContainer>
            </Container>
        )
    }
}

export default Header;