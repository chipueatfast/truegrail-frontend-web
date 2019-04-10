import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import panelStore from '../panelStore';
import { observer } from 'mobx-react';

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


class CustomizedDialogDemo extends React.Component {


  handleClose = () => {
    panelStore.closeModal();
  };

  render() {
    
    const {
        modalTitle,
        isModalOpen,
        renderModalContent,
    } = panelStore;

    console.log('modal', isModalOpen);

    return (
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={isModalOpen}
        >
            <DialogTitle
                onClose={panelStore.closeModal}
            >
                {modalTitle}
            </DialogTitle>
            {
                renderModalContent()
            }
        </Dialog>
    );
  }
}

export default observer(CustomizedDialogDemo);