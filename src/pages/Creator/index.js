import React, { useState } from 'react';
import * as Yup from 'yup';
import FormControl from '@material-ui/core/FormControl';
import { Formik } from 'formik';
import { TextField, Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { CustomizedErrorMessage } from '~/tg-ui/FormComponent';
import {Container} from './styled';
import {addFactoryFromCreator} from './service';
import { showNoticeComponent } from '~/utils/notice';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('This field is mandatory'),
    username: Yup.string().required('This field is mandatory'),
    address: Yup.string().required('This field is mandatory'),
    brand: Yup.string().required('This field is mandatory'),
});


function Creator() {
    const brandList = [
        {
            label: 'Vans',
            value: 'vans',
        },
        {
            label: 'Nike',
            value: 'nike',
        },
        {
            label: 'Adidas',
            value: 'adidas',
        },
    ]

    const [openSelect, setOpenSelect] = useState(false);
    
    return (
        <Container>
            <span>Creator</span>
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    email: '',
                    username: '',
                    address: '',
                    brand: '',
                }}
                onSubmit={async (values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    console.log(values);
                    const {
                        err,
                    } = await addFactoryFromCreator(values);
                    console.log(err);
                    if (!err) {
                        showNoticeComponent({
                            variant: 'success',
                            message: 'Added factory',
                        });
                        resetForm();
                    } else {
                        showNoticeComponent({
                            variant: 'error',
                            message: err.message,
                        });
                    }
                    setSubmitting(false);
                }}
            >
                {
                    ({
                        values,
                        setValues,
                        handleChange,
                        isSubmitting,
                        handleSubmit,
                        isValid,
                    }) => (
                        <>
                            <TextField
                                className='text-field'
                                value={values.email}
                                name='email'
                                onChange={handleChange}
                                label='Factory Email'
                            />
                            <CustomizedErrorMessage
                                name='email'
                            />
                            <TextField
                                className='text-field'
                                value={values.username}
                                name='username'
                                onChange={handleChange}
                                label='Factory Name'
                            />
                            <CustomizedErrorMessage
                                name='username'
                            />
                            <TextField
                                className='text-field'
                                value={values.address}
                                name='address'
                                onChange={handleChange}
                                label='Factory Address'
                            />
                            <CustomizedErrorMessage
                                name='address'
                            />
                            <FormControl
                                className='select text-field'
                            >
                                <InputLabel id="brand-label">Brand</InputLabel>
                                <Select
                                    id='select-component'
                                    onClose={() => setOpenSelect(false)}
                                    onOpen={() => setOpenSelect(true)}
                                    onChange={(e) => {
                                        setValues({
                                            ...values,
                                            brand: e.target.value,
                                        });
                                    }}
                                    open={openSelect}
                                    value={values.brand}
                                >
                                    {
                                        brandList.map(brand => {
                                            return (
                                                <MenuItem
                                                    key={brand.value}
                                                    value={brand.value}
                                                >
                                                    {brand.label}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <CustomizedErrorMessage
                                name='brand'
                            />
                            <Button
                                disabled={isSubmitting || !isValid}
                                variant='contained'
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