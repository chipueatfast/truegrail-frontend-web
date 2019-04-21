import React from 'react';
import { Formik } from 'formik';
import { FormLayout } from 'tg-ui';
import WAValidator from 'wallet-address-validator';
import panelStore from '~/stores/panelStore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container } from './styled';

import { transferSneaker } from '../service';

function TransferModal({
    sneakerId,
}) {
    const initialValues = {
        address: '0xF909B33a5344940DfDA91Fbc9969B1d737EeB784',
    };
    return (
        <Container>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, {setSubmitting, setErrors}) => {
                    setSubmitting(true);
                    const valid = WAValidator.validate(values.address, 'ETH');
                    if (valid) {
                        // transfer sneaker;
                        transferSneaker(sneakerId, values.address);
                        return;
                    }
                    else {
                        setSubmitting(false);
                        setErrors({
                            address: 'Not a valid address',
                        });
                        return;
                    }
                }}
            >
            {
                ({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                }) => (
                <>
                    <TextField
                        className='text-field'
                        label='Buyer address'
                        value={values.address}
                        onChange={handleChange}
                        name='address'
                    />
                    <FormLayout.Error>{errors.address}</FormLayout.Error>
                    <div
                        className='action'
                    >
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handleSubmit}
                        >
                            Transfer
                        </Button>
                        <Button
                            variant='outlined'
                            color='primary'
                            onClick={panelStore.closeModal}
                        >
                            Cancel
                        </Button>
                    </div>
                </>
                )
            }
            </Formik>     
        </Container>
    )
}

export default TransferModal;