import React from 'react';
import QRCode from 'qrcode-react';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { 
    StampContainer, MainContainer, useStyles,
    QRContainer, ActionContainer, ActionItem,
    PrivateContainer,
 } from './styled';

function GrailStamp() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <StampContainer>
            <MainContainer>
                <QRContainer>
                    <QRCode
                        value='21091997'
                        logo='https://images-na.ssl-images-amazon.com/images/I/51bxzYh9IWL._SX425_.jpg'
                    />
                </QRContainer>
                <ActionContainer>
                    <ActionItem>
                        <span>Show private key</span>
                        <IconButton
                            className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </ActionItem>
                </ActionContainer>
            </MainContainer>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <PrivateContainer>
                    <span>This is the private key</span>
                </PrivateContainer>
            </Collapse>
        </StampContainer>
    )
}

export default GrailStamp;
