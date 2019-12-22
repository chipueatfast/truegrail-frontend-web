import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import { addGlobalStyle } from '~/styles/variableStyles';

export const Container = styled.div`
    width: 100%;
    margin-top: 24px;
`

export const ConditionalTableCell = styled(TableCell)`
  color: 'black';
`
export const InverseTableCell = addGlobalStyle(styled(TableCell)``, ['color-white', 'bg-general']);

export const useStyles = makeStyles((theme, props) => ({
    root: {
      width: '100%',
      marginBottom: 48,
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