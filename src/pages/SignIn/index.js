import React, { useState } from 'react';
import AuthenticationMiniature from '~/assets/img/authentication.png';
import { TextField, Button } from '@material-ui/core';
import { Formik } from 'formik';
import { Container, Miniature } from './styled';
import { signIn } from './service';


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
            <h1>Welcome to TrueGrails</h1>
            <Miniature
                src={AuthenticationMiniature}
                alt='miniature'
            />
            <Formik
                initialValues={{
                    userIdentity: '',
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
                            name='userIdentity'
                            onChange={handleChange}
                            label='Email'
                            value={values.userIdentity}
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