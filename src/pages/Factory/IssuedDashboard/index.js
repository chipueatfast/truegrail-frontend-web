import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getIssuedSneakers } from '../service';
import { useStyles, ConditionalTableCell, InverseTableCell, Container } from './styled';

function IssuedDashboard() {
    const [issued, setIssued] = useState([]);
    useEffect(() => {
      getIssuedSneakers.then(sneakers => {
        setIssued(sneakers);
      })
    }, []);
    const classes = useStyles();

    if (issued.length === 0) {
      return null;
    }

    return (
    <Container className={classes.root}>
      <h2>Created Issuers </h2>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <InverseTableCell>ID</InverseTableCell>
              <InverseTableCell>Brand</InverseTableCell>
              <InverseTableCell>Model</InverseTableCell>
              <InverseTableCell>Colorway</InverseTableCell>
              <InverseTableCell>Size</InverseTableCell>
              <InverseTableCell>Limited Edition</InverseTableCell>
              <InverseTableCell>Release Date</InverseTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issued.map(({
                id,
                brand,
                model,
                colorway,
                limitedEdition,
                releaseDate,
                size,
            }) => {
              return (
                <TableRow
                  key={id}
                >
                  <ConditionalTableCell>
                    {id}
                  </ConditionalTableCell>
                  <ConditionalTableCell>
                    {brand}
                  </ConditionalTableCell>
                  <ConditionalTableCell>
                    {model}
                  </ConditionalTableCell>
                  <ConditionalTableCell>
                    {colorway}
                  </ConditionalTableCell>
                  <ConditionalTableCell>
                    {limitedEdition}
                  </ConditionalTableCell>
                  <ConditionalTableCell>
                    {releaseDate}
                  </ConditionalTableCell>
                  <ConditionalTableCell>
                    {size}
                  </ConditionalTableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    </Container>
    );
}

export default IssuedDashboard;