import React from 'react';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';

import { Container } from './styled';
import {claimSneaker} from './service';



function SimUser() {
    return (
        <Container>
            <Formik
                onSubmit={async (values) => {
                    console.log(values);
                    await claimSneaker(values);
                }}
                initialValues={{
                    claimerId: '',
                    sneakerId: '',
                    sneakerAccount: '',
                    claimCode: '',
                }}
                render={({values, handleChange, handleSubmit }) => {
                    return (
                        <>
                            <TextField
                                value={values.claimerId}
                                name='claimerId'
                                label='claimerId'
                                onChange={handleChange}
                            />
                            <TextField
                                value={values.sneakerId}
                                name='sneakerId'
                                label='sneakerId'
                                onChange={handleChange}
                            />
                            <TextField
                                value={values.sneakerAccount}
                                name='sneakerAccount'
                                label='sneakerAccount'
                                onChange={handleChange}
                            />
                            <TextField
                                value={values.claimCode}
                                name='claimCode'
                                label='claimCode'
                                onChange={handleChange}
                            />
                            <button
                                onClick={handleSubmit}
                            >
                                claim
                            </button>
                        </>
                    );
                }}
            />

        </Container>
    )
}

export default SimUser;
