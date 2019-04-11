import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import LoyaltyIcon from '@material-ui/icons/Loyalty'
import { Formik, Field } from 'formik';
import { FormLayout } from '../../tg-ui';
import { Container } from './styled';
import {generateSneakerId, hashInitInfoJSON} from '../service';
import PublishSneakerStore from '../stores/PublishSneakerStore';

function InfoInput(props) {
    const initialValues = {
        brand: 'vans',
        model: 'slip on checkerboard',
        size: '8.5',
        colorway: 'black-white',
        releaseDate: '01/04/2019',
        quantity: '10',
        limitedEdition: true,
    }
    return (
        <Container>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    const idBatch = generateSneakerId(values.quantity);
                    idBatch.forEach(id => {
                        PublishSneakerStore.addLabel(hashInitInfoJSON(id, values));
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
                                <FormLayout.Container col={2}>
                                    <TextField
                                        label='Brand'
                                        disabled
                                        name='brand'
                                        onChange={handleChange}
                                        value={values.brand}
                                        margin='normal'
                                        className='text-field'
                                    />
                                    <TextField
                                        label='Model'
                                        name='model'
                                        onChange={handleChange}
                                        value={values.model}
                                        margin='normal'
                                        className='text-field'
                                    />
                                </FormLayout.Container>
                                <FormLayout.Container col={3}>
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
                                    <TextField
                                        label='Release Date'
                                        name='releaseDate'
                                        onChange={handleChange}
                                        value={values.releaseDate}
                                        margin='normal'
                                        className='text-field'
                                    />
                                </FormLayout.Container>
                                <FormLayout.Container col={2}>
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

                                <Button
                                    type="submit"
                                    style={{
                                        margin: 10
                                    }}
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
                            </>
                        )
                    }
                }
            </Formik>
        </Container>
    );
}

export default InfoInput;