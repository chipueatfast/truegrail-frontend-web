import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

export const Container = styled.div`
    width: 100%;
`

export const ConditionalTableCell = styled(TableCell)`
  color: ${props => !!props.iscontrast ? 'black' : 'white'} !important;
`

export const useStyles = makeStyles((theme, props) => ({
    root: {
      width: '100%',
    },
    paper: {
      border: '1px black solid',
      marginTop: theme.spacing(3),
      width: '100%',
      overflowX: 'auto',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
}));