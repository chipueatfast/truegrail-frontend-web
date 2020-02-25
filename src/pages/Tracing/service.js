import { getRecordFromTableByKey } from '~/utils/eosio';
import { asyncTryCatchReq } from '~/utils/customAxios';
import API from '~/api';

async function getHistoriesMultiIndexBySneakerId(sneakerId) {
    const rows = await getRecordFromTableByKey({
        table: 'histories',
        id: sneakerId,
        index_position: 'tertiary',
        key_type: 'i64',
    });
    if (!rows) {
        return [];
    }
    return rows;
}

// sample

// const returnt = {
//     issue: {},
//     claim: {},
//     resell: [],
// }

async function getTransactionDetailFromMultiIndex(rawRows) {
    const [err, rs] = await asyncTryCatchReq({
        url: API().tracing(),
        method: 'post',
        data: {
            rows: rawRows,
        }
    })
    if (err) {
        return {};
    }
    return rs.data;
}

export async function fetchHistoryOfASneaker(sneakerId) {
    const rawRows = await getHistoriesMultiIndexBySneakerId(sneakerId);
    const details = await getTransactionDetailFromMultiIndex(rawRows);
    return details;
}