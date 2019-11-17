import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Formik } from 'formik';
import { Container } from './styled';
import { signIn } from './service';

import { generateKeyPair } from '~/utils/eosio';

function SignIn() {
    const [error, setError] = useState('');
    async function onSubmit(values, {setSubmitting}) {
        setSubmitting(true);
        const {
            err,
        } = await signIn(values);
        if (err) {
            setError(err.message);
        }
    }
    return (
        <Container>
            <button
                onClick={generateKeyPair}
            >
                Test Keys
            </button>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={onSubmit}
                render={({
                        values,
                        handleChange,
                        handleSubmit,
                    }) => (
                    <>
                        <TextField
                            className='text-field'
                            name='email'
                            onChange={handleChange}
                            label='Email'
                            value={values.email}
                        />
                        <TextField
                            className='text-field'
                            name='password'
                            type='password'
                            label='Password'
                            onChange={handleChange}
                            value={values.password}
                        />
                        <span className='text-field bold color-negative'>
                            {error}
                        </span> 
                        <Button
                            onClick={handleSubmit}
                            variant='contained'
                        >
                            Sign In
                        </Button>
                    </>
                )}
            />
        </Container>
    )
}

export default SignIn;