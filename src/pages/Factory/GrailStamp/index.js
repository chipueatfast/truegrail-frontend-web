import React from 'react';
import QRCode from 'qrcode-react';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { showNotice } from '~/utils/notice';
import { issueSneakerToSystem } from '../service';
import { 
    StampContainer, MainContainer, useStyles,
    QRContainer, ActionContainer, ActionItem,
    PrivateContainer,
 } from './styled';

function GrailStamp({
    id,
    hash,
    eosCreds,
    password,
}) {
    const classes = useStyles();
    const {
        privateKey,
        publicKey,
        eosName,
    } = eosCreds;

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <StampContainer className='w-100'>
            <MainContainer>
                <QRContainer>
                    <QRCode
                        value={id.toString()}
                        logo='https://images-na.ssl-images-amazon.com/images/I/51bxzYh9IWL._SX425_.jpg'
                    />
                </QRContainer>
                <ActionContainer>
                    <ActionItem>
                        <Button
                            onClick={async () => {
                                const rs = await issueSneakerToSystem(password, {
                                    id,
                                    claimPublicKey: publicKey,
                                    claimEosName: eosName,
                                    infoHash: hash,
                                });
                                if (rs.error) {
                                    showNotice('error', rs.error);
                                }
                                console.log(rs.isIssued);
                            }}
                            theme='primary'
                            variant='contained'
                        >
                            ISSUE
                        </Button>
                    </ActionItem>
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
                    <span>{privateKey}</span>
                </PrivateContainer>
            </Collapse>
        </StampContainer>
    )
}

export default GrailStamp;
