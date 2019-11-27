import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import LoyaltyIcon from '@material-ui/icons/Loyalty'
import { Formik, Field } from 'formik';
import { FormLayout } from '~/tg-ui/index';
import userStore from '~/stores/userStore';
import { Container, FirstLineInFormContainer, ActionContainer } from './styled';
import {generateSneakerId} from '../service';
import publishSneakerStore from '../stores/publishSneakerStore';

function InfoInput({
    handleNext,
}) {
    const initialValues = {
        brand: 'vans',
        model: 'slip on checkerboard',
        size: '8.5',
        colorway: 'black-white',
        releaseDate: '2019-01-04',
        quantity: '10',
        limitedEdition: false,
        condition: 'issued',
        ownerAddress: userStore.address,
    }
    return (
        <Container>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    handleNext();
                    publishSneakerStore.setLabels(generateSneakerId(values.quantity));
                    delete values.quantity;
                    publishSneakerStore.setBatchInfo({
                        ...values,
                        size: parseFloat(values.size),
                    });
                  }}
            >
                {
                    (formikProps) => {
                        const {
                            handleChange,
                            values,
                            handleSubmit,
                        } = formikProps;

                        return (
                            <>
                                <FirstLineInFormContainer>
                                    <TextField
                                        className='brand text-field'
                                        label='Brand'
                                        disabled
                                        name='brand'
                                        onChange={handleChange}
                                        value={values.brand}
                                        margin='normal'
                                    />
                                    <TextField
                                        className='model text-field'
                                        label='Model'
                                        name='model'
                                        onChange={handleChange}
                                        value={values.model}
                                        margin='normal'
                                    />
                                </FirstLineInFormContainer>
                                <FormLayout.Container col={2}>
                                    <TextField
                                        label='Size'
                                        name='size'
                                        onChange={handleChange}
                                        value={values.size}
                                        margin='normal'
                                        className='text-field'
                                    />
                                    <TextField
                                        label='Colorway'
                                        name='colorway'
                                        onChange={handleChange}
                                        value={values.colorway}
                                        margin='normal'
                                        className='text-field'
                                    />
                                </FormLayout.Container>
                                <FormLayout.Container col={3}>
                                    <TextField
                                        label='Release Date'
                                        name='releaseDate'
                                        onChange={handleChange}
                                        value={values.releaseDate}
                                        margin='normal'
                                        className='text-field'
                                    />
                                    <TextField
                                        label='Quantity'
                                        name='quantity'
                                        onChange={handleChange}
                                        value={values.quantity}
                                        margin='normal'
                                        className='text-field'
                                    />
                                    <FormControlLabel
                                        control={
                                            <Field
                                                name="limitedEdition"
                                                type="checkbox"
                                                render={({ field }) =>(
                                                    <Checkbox
                                                        checked={field.value}
                                                        {...field}
                                                        color="primary"
                                                    />
                                                )}
                                            />
                                        }
                                        label="Limited"
                                    />
                                </FormLayout.Container>
                                <ActionContainer>
                                    <Button
                                        variant='contained'
                                        onClick={() => location.reload()} // eslint-disable-line
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className='item'
                                        type="submit"
                                        onClick={handleSubmit}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Create QR code
                                        <LoyaltyIcon 
                                            style={{
                                                marginLeft: 10,
                                            }}
                                        />
                                    </Button>
                                </ActionContainer>

                            </>
                        )
                    }
                }
            </Formik>
        </Container>
    );
}

export default InfoInput;