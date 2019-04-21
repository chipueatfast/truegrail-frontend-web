import React from 'react';
import { Formik } from 'formik';
import { TextField, Button } from '@material-ui/core';

import {Container} from './styled';
import { showAddFactoryPermissionModal } from './service';

function Creator() {
    
    return (
        <Container>
            <span>Creator</span>
            <Formik
                initialValues={{
                    password: 'offthewall',
                    physicalAddress: 'Hẻm 141, An Bình, Thành phố Biên Hòa, Đồng Nai',
                    address: '0x8909969a0deA718d996eb1e82e67B484F831909f',
                    brand: 'vans',
                }}
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(true);
                    showAddFactoryPermissionModal(values.address, values.brand);
                }}
            >
                {
                    ({
                        values,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <>
                            <TextField
                                className='text-field'
                                value={values.physicalAddress}
                                name='physicalAddress'
                                onChange={handleChange}
                                label='Factory Address'
                            />
                            <TextField
                                className='text-field'
                                value={values.address}
                                name='address'
                                onChange={handleChange}
                                label='Factory Address'
                            />
                            <TextField
                                className='text-field'
                                value={values.password}
                                name='password'
                                onChange={handleChange}
                                label='Password'
                                type='password'
                            />
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={handleSubmit}
                            >
                                Add Factory
                            </Button>
                        </>
                    )
                }
            </Formik>
        </Container>
    )
}

export default Creator;