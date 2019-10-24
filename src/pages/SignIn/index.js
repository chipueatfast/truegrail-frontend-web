import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { Formik } from 'formik';
import { addOrChangeAccount } from './service';
import { Container } from './styled';

function SignIn() {
    return (
        <Container>
            <Formik
                initialValues={{
                    blockchainAddress: '',
                }}
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(true);
                    console.log(values.blockchainAddress.toString());
                    addOrChangeAccount(values.blockchainAddress.toString());
                }}
                render={({
                        values,
                        handleChange,
                        handleSubmit,
                    }) => (
                    <>
                        <TextField
                            name='blockchainAddress'
                            onChange={handleChange}
                            label='Blockchain Address'
                            value={values.blockchainAddress}
                        />

                        <Button
                            onClick={handleSubmit}
                        >
                            Change account
                        </Button>
                    </>
                )}
            />
        </Container>
    )
}

export default SignIn;