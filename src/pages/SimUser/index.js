import React from 'react';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

import { claimSneaker } from './service';

class SimUser extends React.Component {

    render() {
        const initialValues = {
            address: '0xF909B33a5344940DfDA91Fbc9969B1d737EeB784',
            sneakerId: '',
        }
        return (
            <div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => {
                        claimSneaker(values.address, values.sneakerId)
                    }}
                >
                    {
                        (
                            {
                                handleChange,
                                values,
                                handleSubmit,
                            }
                        ) => (
                            <>
                                <TextField
                                    label='Address'
                                    onChange={handleChange}
                                    value={values.address}
                                    name='address'
                                />

                                <TextField
                                    label='Id'
                                    onChange={handleChange}
                                    value={values.sneakerId}
                                    name='sneakerId'
                                />

                                <Button
                                    onClick={handleSubmit}
                                >
                                    Claim Sneaker
                                </Button>

                            </>
                        )
                    }
                    
                </Formik>
            </div>
        )
    }
}

export default SimUser;
