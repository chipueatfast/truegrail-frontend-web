import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container } from './styled';


function LoadingIndicator({
    wrapped
}) {
    return (
        <Container wrapped={wrapped}>
            <CircularProgress
                disableShrink
            />
        </Container>
    )
}

export default LoadingIndicator;
