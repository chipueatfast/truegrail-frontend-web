import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { useStyles, ConditionalTableCell, InverseTableCell, Container } from './styled';

function FactoryTable({
    factories,
}) {
    const classes = useStyles();

    if (factories.length === 0) {
      return null;
    }

    return (
    <Container className={classes.root}>
      <h2>Created Issuers </h2>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <InverseTableCell>Name</InverseTableCell>
              <InverseTableCell>Email</InverseTableCell>
              <InverseTableCell>Address</InverseTableCell>
              <InverseTableCell>Brand</InverseTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {factories.map(row => {
              // ConditionalTableCell problem
              const isBlockchainMatchedToNumber = row.isBlockchainMatched ? 1 : 0;
              return (
                <TableRow
                  className={row.isBlockchainMatched ? '' : 'bg-negative'}
                  key={row.username}
                >
                  <ConditionalTableCell iscontrast={isBlockchainMatchedToNumber}>{row.username}</ConditionalTableCell>
                  <ConditionalTableCell iscontrast={isBlockchainMatchedToNumber}>{row.userIdentity}</ConditionalTableCell>
                  <ConditionalTableCell iscontrast={isBlockchainMatchedToNumber}>{row.address}</ConditionalTableCell>
                  <ConditionalTableCell iscontrast={isBlockchainMatchedToNumber}>{row.brand}</ConditionalTableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    </Container>
    );
}

export default FactoryTable;