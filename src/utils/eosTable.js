import { JsonRpc } from 'eosjs';
import SHA256 from 'crypto-js/sha256';

const rpc = new JsonRpc(process.env.REACT_APP_NODEOS_URL);

console.log(process.env.REACT_APP_NODEOS_URL);
export async function getRecordFromTableByKey({
    table,
    id,
}) {
    const rs = await rpc.get_table_rows({
        json: true,
        code: 'truegrail2',
        scope: 'truegrail2',
        table,
        lower_bound: id, 
        upper_bound: id+1,
    });
    return rs.rows;
}

function sortToGivenOrder({
    object,
    keys,
}) {
    const orderedObject = {};
    keys.forEach((key) => {
        orderedObject[key] = object[key];
    });
    return orderedObject;
}

export function createCorrespondingUserHash(user) {
    const keys = ['email', 'username', 'role', 'address', 'brand'];
    const orderedUser = sortToGivenOrder({
        object: user,
        keys,
    });
    return SHA256(JSON.stringify(orderedUser)).toString();
}

