import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const StampContainer = styled.div`
    padding: 12px;
    display: flex;
    flex-direction: column;
`

export const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const QRContainer = styled.div`
    height: 128px;
    width: 128px;
`

export const PrivateContainer = styled.div`
`

export const ActionContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const ActionItem  = styled.div`
    display: flex;
    flex-direction: row;
`

export const useStyles = makeStyles(theme => ({
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }));