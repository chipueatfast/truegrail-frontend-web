import React from 'react';
import QRCode from 'qrcode-react';
import classNames from 'classnames';
import { Button, CircularProgress, ListItem } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import { toJS } from 'mobx';
import { compose } from 'react-redux';

import { issueSneaker } from '../service';
import { notifyNewSneaker } from './service';

import publishSneakerStore from '../stores/publishSneakerStore';
import { observer } from 'mobx-react';

const styles = theme => ({
    container: {
        width: '500px',
        border: '1px solid black',
        margin: '10px',
    },
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

@observer
class LabelC extends React.Component {
    state = {
        publishState: 0,
        tx: '',
    }

    onSuccess = (tx) => {
        const {
            data,
        } = this.props;
        this.setState({
            publishState: 2,
            tx,
        });
        notifyNewSneaker(data);
    } 

    onError = () => {
        this.setState({
            publishState: 3,
        });
    }

    styles = {
        2: 'published',
        3: 'error', 
    }

    renderActions = () => {
        const {
            data
        } = this.props;
        const {
            publishState,
        } = this.state;

        const batchInfo = publishSneakerStore.batchInfo;
        
        console.log(toJS(batchInfo));
        switch (publishState) {
            case 0: 
                return (
                    <Button
                        variant='contained'
                        onClick={() => {
                            this.setState({
                                publishState: 1,
                            });
                            issueSneaker(data, batchInfo, this.onSuccess, this.onError);
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
                    <span>{data}</span>
                    {/* <span>{tx}</span> */}
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


    render() {
        const {
            publishState,
        } = this.state;

        const {
            classes,
            data,
        } = this.props
        return (
            <ListItem
                className={classNames(classes.container , classes[styles[publishState]] || '')}
            >
                <QRCode
                    value={data.toString()}
                    logo='https://images-na.ssl-images-amazon.com/images/I/51bxzYh9IWL._SX425_.jpg'
                />
                <div
                    className={classes.action}
                >
                { this.renderActions() }
                </div>
            </ListItem>
        )
    }
}

// function Label({
//     classes,
//     data,
// }) {
//     // 0: unpublished
//     // 1: publishing
//     // 2: published
//     // 3: error
//     const [publishState, setPublishState] = React.useState(0);
//     const [tx, setTx] = React.useState('');

//     const onSuccess = (tx) => {
//         const batchInfo = publishSneakerStore.batchInfo;
//         setPublishState(2);
//         setTx(tx);
//         notifyNewSneaker({
//             ...batchInfo,
//             id: data,
//         });
//     } 
//     const onError = () => {
//         setPublishState(3);
//     }

//     const styles = {
//         2: 'published',
//         3: 'error', 
//     }

//     const renderActions = () => {
//         const batchInfo = publishSneakerStore.batchInfo;
//         console.log(toJS(batchInfo));
//         switch (publishState) {
//             case 0: 
//                 return (
//                     <Button
//                         variant='contained'
//                         onClick={() => {
//                             setPublishState(1);
//                             issueSneaker(data.id, batchInfo, onSuccess, onError);
//                         }}
//                     >
//                         Publish
//                     </Button>
//                 )
//             case 1:
//                 return (
//                     <CircularProgress />
//                 )
//             case 2:
//                 return (
//                 <>
//                     <CheckIcon />
//                     <span>{data}</span>
//                     {/* <span>{tx}</span> */}
//                 </>
//                 )
//             case 3: 
//                 return (
//                     <CloseIcon />
//                 )
//             default:
//                     break;
//         }
//     }

//     return (
//         <ListItem
//             className={classNames(classes.container , classes[styles[publishState]] || '')}
//         >
//             <QRCode
//                 value={data.toString()}
//                 logo='https://images-na.ssl-images-amazon.com/images/I/51bxzYh9IWL._SX425_.jpg'
//             />
//             <div
//                 className={classes.action}
//             >
//             { renderActions() }
//             </div>
//         </ListItem>
//     )
// }

export default withStyles(styles)(LabelC);