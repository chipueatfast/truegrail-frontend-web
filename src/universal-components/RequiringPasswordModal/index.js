import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Container } from './styled';
import LoadingIndicator from '../LoadingIndicator/index';
import { simulateLongFetch } from '~/utils/async';

function RequiringPasswordModal({
    protectedCallback,
}) {
    const [password, setPassword] = useState('');
    const [isInAction, setIsInAction] = useState(false);
    return (
        <Container>
            {
                isInAction ?
                <LoadingIndicator
                    wrapped
                /> :
                (
                    <>
                        <span>
                            Please reconfirm this action by typing in your password
                        </span>
                        <TextField
                            className='password-input'
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            value={password}
                            type='password'
                            margin='normal'
                        />
                        <Button
                            variant='contained'
                            onClick={async () => {
                                setIsInAction(true);
                                await simulateLongFetch(3000);
                                protectedCallback(password, setIsInAction);
                            }}
                        >
                            Confirm
                        </Button>
                    </>
                )
            }
        </Container>
    );
}

export default RequiringPasswordModal;
