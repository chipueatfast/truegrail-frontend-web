import React from 'react';
import styled from 'styled-components';
import { ErrorMessage } from 'formik';
import { addGlobalStyle } from '~/styles/variableStyles';

const ErrorContainer = addGlobalStyle(
    styled.div`
        margin: 12px 0;
    `,
    ['color-negative', 'bold']
)

export function CustomizedErrorMessage({ name, value }) {
    return (
        <ErrorContainer>
            {
                name ? (            
                <ErrorMessage
                    name={name}
                />) :
                <span>
                    {value}
                </span>
            }

        </ErrorContainer>
    )
}


