import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { SketchPicker } from 'react-color';
import * as Yup from 'yup';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import LoyaltyIcon from '@material-ui/icons/Loyalty'
import { Formik, Field } from 'formik';
import { FormLayout } from '~/tg-ui/index';
import { CustomizedErrorMessage } from '~/tg-ui/FormComponent';
import { Container, FirstLineInFormContainer, ActionContainer, ColorPickerContainer, CenterContainer } from './styled';
import { getItemFromStorage } from '~/utils/localStorage';


const validationSchema = Yup.object().shape({  
    model: Yup.string().required('This field is mandatory'),
    size: Yup.number().required('This field is mandatory'),
    quantity: Yup.number().required('This field is mandatory'),
    furtherSpec: Yup.string().required('This field is mandatory'), 
});

function InfoInput({
    handleNext,
    setBatchInfo,
}) {
    
    const [releaseDate, setReleaseDate] = useState(new Date());
    const [colorway, setColorway] = useState('');
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const user = getItemFromStorage('user');
    if (!user) {
        return 'Can not find the credential';
    }
    const initialValues = {
        brand: user.brand,
        model: '',
        size: '',
        quantity: '10',
        limitedEdition: false,
        furtherSpec: '',
    }

    const handleDateChange = date => {
        setReleaseDate(date);
    };
    const handleClickColorPicker = () => {
        setDisplayColorPicker(!displayColorPicker);
    }
    const handleCloseColorPicker = () => {
        setDisplayColorPicker(false);
    }

    const handleChangeColorPicker = (color) => {
        setColorway(color.hex);
    };

    function renderColorwayValue() {
        return colorway.replace('#', '');
    }

    return (
        <Container>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                    setSubmitting(true);
                    if (!colorway) {
                        setErrors({
                                    colorway: 'Please fill',
                                });
                        setSubmitting(false);
                        return;
                    }
                    setBatchInfo({
                        ...values,
                        colorway,
                        releaseDate,
                        size: parseFloat(values.size),
                    });
                    handleNext();
                  }}
            >
                {
                    (formikProps) => {
                        const {
                            handleChange,
                            values,
                            errors,
                            handleSubmit,
                        } = formikProps;
                        console.log(errors);
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
                                <FormLayout.Container col={3}>
                                    <div />
                                    <CustomizedErrorMessage
                                        name='model'
                                    />
                                </FormLayout.Container>
                                <FormLayout.Container col={3}>
                                    <TextField
                                        label='Size'
                                        name='size'
                                        InputProps={{
                                            endAdornment: <InputAdornment position='end'>cm</InputAdornment>,
                                        }}
                                        onChange={handleChange}
                                        value={values.size}
                                        margin='normal'
                                        className='text-field'
                                    />
                                    <TextField
                                        label='Colorway'
                                        name='colorway'
                                        onChange={(e) => {
                                            setColorway('#' + e.target.value);
                                        }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position='start'>#</InputAdornment>,
                                        }}
                                        value={renderColorwayValue()}
                                        margin='normal'
                                        className='text-field'
                                    />
                                    <CenterContainer>
                                    <ColorPickerContainer
                                        color={colorway}
                                    >

                                        <div onClick={handleClickColorPicker} className='color' />
                                        { displayColorPicker ? 
                                        <div className='popover'>
                                            <div 
                                                className='cover' 
                                                onClick={handleCloseColorPicker}
                                            />
                                            <SketchPicker 
                                                color={colorway} 
                                                onChange={handleChangeColorPicker} 
                                            />
                                        </div> 
                                        : null }
                                    </ColorPickerContainer>

                                    </CenterContainer>
                                    
                                    
                                </FormLayout.Container>
                                <FormLayout.Container col={3}>
                                    <CustomizedErrorMessage
                                        name='size'
                                    />
                                    <CustomizedErrorMessage
                                        value={errors.colorway}
                                    />
                                </FormLayout.Container>
                                <FormLayout.Container col={3}>
                                <MuiPickersUtilsProvider 
                                    utils={DateFnsUtils}
                                >
                                    <KeyboardDatePicker
                                        className='text-field'
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Release date"
                                        value={releaseDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>

                                </FormLayout.Container>
                                <FormLayout.Container col={3}>
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

                                <FormLayout.Container>
                                    <TextField
                                        variant='outlined'
                                        name='furtherSpec'
                                        onChange={handleChange}
                                        label="Further specification"
                                        multiline
                                        rows="4"
                                        value={values.furtherSpec}
                                        margin="normal"
                                        className='text-field'
                                    />
                                </FormLayout.Container>
                                <FormLayout.Container>
                                    <CustomizedErrorMessage
                                        name='furtherSpec'
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