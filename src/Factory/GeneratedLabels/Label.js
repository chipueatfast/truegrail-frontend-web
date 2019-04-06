import React from 'react';
import QRCode from 'qrcode-react';
import { Button, CircularProgress, ListItem } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    published: {
        background: '#098300',
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
    const [publishState, setPublishState] = React.useState(0);

    return (
        <ListItem
            className={publishState === 2 ? classes.published : ''}
        >
            <QRCode
                value={data.id.toString()}
                logo='https://images-na.ssl-images-amazon.com/images/I/51bxzYh9IWL._SX425_.jpg'
            />
            <div
                className={classes.action}
            >
            {
                !publishState ? (
                    <Button
                        variant='contained'
                        onClick={() => {
                            setPublishState(1);
                        }}
                    >
                        Publish
                    </Button>
                ) : (
                    publishState === 1 ?
                    (
                        <CircularProgress />
                    ) : (
                        <CheckIcon />
                    ) 
                )
            }
            </div>
        </ListItem>
    )
}

export default withStyles(styles)(Label);