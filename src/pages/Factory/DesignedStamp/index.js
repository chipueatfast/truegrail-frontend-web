import React, { useState } from 'react';
import QRCode from 'qrcode-react';
import Button from '@material-ui/core/Button';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ErrorIcon from '@material-ui/icons/Error';
import Tooltip from '@material-ui/core/Tooltip';
import { simulateLongFetch } from '~/utils/async';
import LoadingIndicator from '~/universal-components/LoadingIndicator/index';
import LoadingDot from '~/tg-ui/LoadingDot/index';
import { Container, QRContainer, DetailContainer, ActionContainer } from './styled';


function DesignedStamp({
    id,
    eosName,
    infoHash,
}) {
    const [issueStatus, setIssueStatus] = useState(0);
    const [isPreparingPdf, setIsPreparingPdf] = useState(0);
    function renderPdfLink() {
        return (
            <>
                {
                    isPreparingPdf === 0 ?
                    <LoadingDot
                        width={40}
                        height={10}
                        color='black'
                    /> :
                    <Button         
                        onClick={() => {
                            console.log('supposed to download pdf here');
                        }}
                        variant='contained'
                    >
                        Get Hardcopy
                    </Button> 
                }
            </>
        )
    }
    function renderAction() {
        return (
            <ActionContainer>
                {
                    issueStatus === 0 && (
                        <Button
                            variant='contained'
                            onClick={async () => {
                                setIssueStatus(1);
                                await simulateLongFetch(3000);
                                setIssueStatus(3);
                                await simulateLongFetch(3000);
                                setIsPreparingPdf(1);
                            }}
                        >
                            ISSUE
                        </Button>
                    )
                }
                {
                    issueStatus === 1 && (
                        <LoadingIndicator />
                    )
                }
                {
                    issueStatus === 2 && (
                        <>
                            <VerifiedUserIcon
                                fontSize='large'
                                className='item'
                            />
                            {renderPdfLink()}
                        </>
                    )
                }
                {
                    issueStatus === 3 && (
                        <Tooltip
                            title='The issuation of this label has failed unexpectedly'
                        >
                            <ErrorIcon
                                fontSize='large'
                                color='white'
                            />
                        </Tooltip>
                    )
                }
            </ActionContainer>
        )
    }

    function renderDetail() {
        return (
            <DetailContainer>
                <span className='heading'>
                    ID: {id}
                </span>
                <span className='sub-heading'>
                    Claim account:
                </span>
                <span className='note'>
                    {eosName}
                </span>
                <span className='sub-heading'>
                    Blockchain data:
                </span>
                <Tooltip title={infoHash}>
                    <span className='note'>
                        {infoHash}
                    </span>
                </Tooltip>
            </DetailContainer>
        )
    }

    return (
        <Container issueStatus={issueStatus}>
                <QRContainer>
                    <QRCode
                        value={id.toString()}
                        logo='https://images-na.ssl-images-amazon.com/images/I/51bxzYh9IWL._SX425_.jpg'
                    />
                </QRContainer>
                { renderDetail() }
                { renderAction() }
        </Container>
    );
}

export default DesignedStamp;
