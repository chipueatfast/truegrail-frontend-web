import axios from 'axios';
import { server } from '~/api';

export function asyncTryCatchReq(reqParams) {
    return axios({
        ...reqParams,
        baseURL: server,
    }).then(data => {
        return [null, data];
    }).catch(err => {
        const errorData = err.response.data;
        return [errorData];
    });
}