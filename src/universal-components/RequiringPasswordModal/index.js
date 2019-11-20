import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Container } from './styled';

function RequiringPasswordModal({
    protectedCallback,
}) {
    const [password, setPassword] = useState('');
    return (
        <Container>
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
                onClick={() => {
                    protectedCallback(password);
                }}
            >
                Confirm
            </Button>
        </Container>
    );
}

export default RequiringPasswordModal;
