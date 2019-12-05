import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { Formik } from 'formik';
import { TextField, Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';

import { CustomizedErrorMessage } from '~/tg-ui/FormComponent';
import { showNoticeComponent } from '~/utils/notice';

import FactoryTable from './FactoryTable/index';

import {Container} from './styled';
import {
    addNewFactoryToSystem,
    populateVerifiedFactoryTable,
} from './service';
import { showModalComponent, closeModal } from '~/utils/modal';
import RequiringPasswordModal from '~/universal-components/RequiringPasswordModal/index';
import LoadingIndicator from '~/universal-components/LoadingIndicator/index';



const validationSchema = Yup.object().shape({
    userIdentity: Yup.string().email('Invalid email').required('This field is mandatory'),
    username: Yup.string().required('This field is mandatory'),
    address: Yup.string().required('This field is mandatory'),
    brand: Yup.string().required('This field is mandatory'),
});


const useStyles = makeStyles(theme => ({
    grid: {
      flexGrow: 1,
      maxWidth: 500,
      position: 'relative',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

function Creator() {
    const [openSelect, setOpenSelect] = useState(false);
    const [factories, setFactories] = useState([]);
    const [fetchedTable, setFetchedTable] = useState(false);
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

    const classes = useStyles();
    
    useEffect(() => {
        setFetchedTable(false);
        populateVerifiedFactoryTable().then(
            verifiedFactories => {
                setFactories(verifiedFactories);
                setFetchedTable(true);
            }
        );
    }, [])
    function submitFactoryForm(values, {setSubmitting}) {
        setSubmitting(true);
        showModalComponent({
            modalTitle: 'Add new factory',
            renderModalContent: () => (
                <RequiringPasswordModal
                    protectedCallback={async (password, setIsInAction) => {
                        const {
                            error,
                            newFactory,
                        } = await addNewFactoryToSystem({
                            formValues: values,
                            password,
                        });
                        setIsInAction(false);
                        setSubmitting(false);
                        if (error) {
                            showNoticeComponent({
                                variant: 'error',
                                message: error.message || 'Incorrect password',
                            });
                            return;
                        };
                        closeModal();
                        showNoticeComponent({
                            variant: 'success',
                            message: 'A new factory has been recorded to TrueGrail',
                        });
                        setFactories([...factories, newFactory]);
                    }}
                />
            )
        })
    }

    return (
        <Container>
            <h1>Creator</h1>
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    userIdentity: '',
                    username: '',
                    address: '',
                    brand: '',
                }}
                onSubmit={submitFactoryForm}
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
                        <Grid className={classes.grid} container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    className='text-field'
                                    value={values.userIdentity}
                                    name='userIdentity'
                                    onChange={handleChange}
                                    label='Factory Email'
                                />
                                <CustomizedErrorMessage
                                    name='userIdentity'
                                />
                            </Grid>
                            <Grid item xs={6}>
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
                            </Grid>
                            <Grid item xs={6}>
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
                            </Grid>
                            <Grid item xs={12}>
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
                            </Grid>
                            <div className='action'>
                                <Button
                                    // disabled={isSubmitting || !isValid}
                                    variant='contained'
                                    onClick={handleSubmit}
                                >
                                    Add Factory
                                </Button>
                            </div>                          
                        
                        </Grid>
                    )
                }
            </Formik>
            {
                fetchedTable ?
                (
                    <FactoryTable
                        factories={factories}
                    />
                ) :
                <LoadingIndicator />
            }
        </Container>
    )
}

export default Creator;