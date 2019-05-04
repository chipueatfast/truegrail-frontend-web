import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { showTransferModal } from '../service';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import ItemImg from './vans_item.jpg';

const styles = {
    media: {
        height: 140.
    },
    card: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: 250,
        width: 250,
    }
}

function ItemCard({
    classes,
    info,
}) {
    return (
        <Card
            className={`item ${classes.card}`}
        >
            <img
                alt='item'
                className={classes.media}
                src={ItemImg}
            />
            <span>{info.id}</span>
            <CardActions>
                <Button
                    color='primary'
                    variant='outlined'
                    onClick={() => {
                        console.log('hooo');
                    }}
                >
                    Get proof
                </Button>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={() => {
                        showTransferModal(info)
                    }}
                >
                    Transfer
                </Button>

            </CardActions>

        </Card>
    )
}

export default withStyles(styles)(ItemCard);