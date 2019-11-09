import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { Formik } from 'formik';
import { TextField, Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import {Container} from './styled';
// import { showAddFactoryPermissionModal } from './service';

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
                initialValues={{
                    email: 'vans_offthewall@gmail.com',
                    username: 'Factory No 1',
                    address: 'Hẻm 141, An Bình, Thành phố Biên Hòa, Đồng Nai',
                    brand: '',

                }}
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(true);
                    console.log(values);
                    
                    
                }}
            >
                {
                    ({
                        values,
                        setValues,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <>
                            <TextField
                                className='text-field'
                                value={values.email}
                                name='email'
                                onChange={handleChange}
                                label='Factoy Email'
                            />
                            <TextField
                                className='text-field'
                                value={values.username}
                                name='username'
                                onChange={handleChange}
                                label='Factory Name'
                            />
                            <TextField
                                className='text-field'
                                value={values.address}
                                name='address'
                                onChange={handleChange}
                                label='Factory Address'
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
                            <Button
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