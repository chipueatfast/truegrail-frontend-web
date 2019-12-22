import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IssuedDashboardMiniature from '~/assets/img/miniature/issuedDashboard.png';

import { getIssuedSneakers } from '../service';
import { useStyles, ConditionalTableCell, InverseTableCell, Container } from './styled';
import LoadingDot from '~/tg-ui/LoadingDot/index';
import { getItemByPrimaryKey } from '~/utils/eosio';
import { simulateLongFetch } from '~/utils/async';


function DataRow({
  id,
  brand,
  model,
  colorway,
  limitedEdition,
  releaseDate,
  size,
}) {
  const [status, setStatus] = useState('');
  useEffect(() => {
    async function didMount() {
      await simulateLongFetch(2000);
      getItemByPrimaryKey({
        table: 'sneakers',
        primaryKeyValue: id,
      }).then(blockchainItem => {
        if (blockchainItem) {
          setStatus(blockchainItem.status);
        }
      });
    }
    didMount();
  }, []);
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
        {size}
      </ConditionalTableCell>
      <ConditionalTableCell>
        {limitedEdition ? <CheckCircleIcon /> : null}
      </ConditionalTableCell>
      <ConditionalTableCell>
        {releaseDate}
      </ConditionalTableCell>
      <ConditionalTableCell>
        {status === '' ? 
        <LoadingDot
          height={20}
        /> : status}
      </ConditionalTableCell>
    </TableRow>
  );

}
function IssuedDashboard() {
    const [issued, setIssued] = useState([]);
    useEffect(() => {
      getIssuedSneakers().then(sneakers => {
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
      <img
        alt='miniature'
        src={IssuedDashboardMiniature}
      />
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
              <InverseTableCell>Current Status</InverseTableCell>
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
                <DataRow
                  key={id}
                  {...{
                    id,
                    brand,
                    model,
                    colorway,
                    limitedEdition,
                    releaseDate,
                    size,
                  }}
                />
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    </Container>
    );
}

export default IssuedDashboard;