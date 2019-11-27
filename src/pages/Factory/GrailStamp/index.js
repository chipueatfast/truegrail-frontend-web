import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { StampContainer, MainContainer, useStyles, QRContainer, ActionContainer, ActionItem } from './styled';

function GrailStamp() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    return (
        <StampContainer>
            <MainContainer>
                <QRContainer>

                </QRContainer>
                <ActionContainer>
                    <ActionItem>
                        <span>Show private key</span>
                        <ExpandMoreIcon />
                    </ActionItem>
                </ActionContainer>

            </MainContainer>
            <Collapse in={expanded} timeout="auto" unmountOnExit>

            </Collapse>
        </StampContainer>
    )
}

export default GrailStamp;
