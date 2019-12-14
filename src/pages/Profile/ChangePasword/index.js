import React from 'react';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { changePassword } from '../service';
import { FormContainer, ActionContainer } from './styled';
import { showNotice } from '~/utils/notice';
import userStore from '~/stores/userStore';

function ChangePassword() {
    return (
        <Formik
            initialValues={{
                oldPassword: '',
                newPassword: '',
                retypePassword: '',
            }}
            onSubmit={async (values, { resetForm }) => {
                const {
                    oldPassword,
                    newPassword,
                    retypePassword,
                } = values;
                if (newPassword !== retypePassword) {
                    showNotice('error', 'Retype password incorrectly');
                    resetForm();
                    return;
                };
                const rs = await changePassword({
                    oldPassword,
                    newPassword,
                });
                if (!rs) {
                    showNotice('error','Can not change password, it might be incorrect old password');
                    return;
                }
                showNotice('success','Password has been changed, please sign in again');
                userStore.logOut();
            }}
            render={({values, handleChange, handleSubmit}) => {
                return (
                    <FormContainer>
                        <TextField
                            className='item'
                            label='Old password'
                            name='oldPassword'
                            type='password'
                            value={values.oldPassword}
                            onChange={handleChange}
                        />
                        <TextField
                            className='item'
                            type='password'
                            label='New password'
                            name='newPassword'
                            value={values.newPassword}
                            onChange={handleChange}
                        />
                        <TextField
                            className='item'
                            type='password'
                            label='Retype new password'
                            name='retypePassword'
                            value={values.retypePassword}
                            onChange={handleChange}
                        />
                        <ActionContainer>
                            <Button
                                className='item'
                                variant='contained'
                                onClick={handleSubmit}
                            >
                                Update
                            </Button>
                        </ActionContainer>
                        

                    </FormContainer>
                );
            }}
        />
    )
}

export default ChangePassword;
