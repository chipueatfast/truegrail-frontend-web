import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const StampContainer = styled.div`
    padding: 12px;
    display: flex;
    flex-direction: column;
    border: solid 1px;
    border-radius: 4px;
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
  display: flex;
  justify-content: flex-end;
  margin: 12px;
`

export const ActionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`

export const ActionItem  = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
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