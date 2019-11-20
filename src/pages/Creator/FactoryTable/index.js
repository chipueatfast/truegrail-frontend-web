import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { useStyles, ConditionalTableCell } from './styled';

function FactoryTable({
    factories,
}) {
    const classes = useStyles();

    return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Brand</TableCell>
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
                  <ConditionalTableCell iscontrast={isBlockchainMatchedToNumber}>{row.email}</ConditionalTableCell>
                  <ConditionalTableCell iscontrast={isBlockchainMatchedToNumber}>{row.address}</ConditionalTableCell>
                  <ConditionalTableCell iscontrast={isBlockchainMatchedToNumber}>{row.brand}</ConditionalTableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
    );
}

export default FactoryTable;