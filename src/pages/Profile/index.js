import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ChangePassword from './ChangePasword/index';
import { Container, useStyles, ActionRow } from './styled';


function Profile() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Container> 
            <h3>PROFILE</h3>
            <ActionRow>
                <span className={expanded ? 'bold' : ''}>Change password</span>
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
            </ActionRow>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <ChangePassword />
            </Collapse>
        </Container>
    )
}

export default Profile;
