import React from 'react';
import QRCode from 'qrcode-react';
import { Button, CircularProgress, ListItem } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

import { issueSneaker, getFirstFactory } from '../service';

const styles = theme => ({
    published: {
        background: '#098300',
        color: 'white',
    },
    error: {
        background: 'red',
        color: 'white',
    },
    action: {
        marginLeft: 20,
    }
});

function Label({
    classes,
    data,
}) {
    // 0: unpublished
    // 1: publishing
    // 2: published
    // 3: error
    const [publishState, setPublishState] = React.useState(0);
    const [tx, setTx] = React.useState('');

    const onSuccess = (tx) => {
        setPublishState(2);
        setTx(tx);
    } 
    const onError = () => {
        setPublishState(3);
    }

    const styles = {
        2: 'published',
        3: 'error', 
    }

    const renderActions = () => {
        switch (publishState) {
            case 0: 
                return (
                    <Button
                        variant='contained'
                        onClick={() => {
                            setPublishState(1);
                            issueSneaker(data.id, data.hashInfo, onSuccess, onError);
                        }}
                    >
                        Publish
                    </Button>
                )
            case 1:
                return (
                    <CircularProgress />
                )
            case 2:
                return (
                <>
                    <CheckIcon />
                    <span>{tx}</span>
                </>
                )
            case 3: 
                return (
                    <CloseIcon />
                )
            default:
                    break;
        }
    }

    return (
        <ListItem
            className={classes[styles[publishState]] || ''}
        >
            <QRCode
                value={data.id.toString()}
                logo='https://images-na.ssl-images-amazon.com/images/I/51bxzYh9IWL._SX425_.jpg'
            />
            <div
                className={classes.action}
            >
            { renderActions() }
            </div>
        </ListItem>
    )
}

export default withStyles(styles)(Label);