import axios from 'axios';
import { server } from '~/api/index';
import { getItemFromStorage } from './localStorage';


export function composeAccessTokenHeader() {
    const accessToken = getItemFromStorage('accessToken');
    return {
        Authorization: "Bearer " + accessToken,
    }
}

export function asyncTryCatchReq(reqParams, isAuthenticated) {
    return axios({
        ...reqParams,
        baseURL: server,
        ...(isAuthenticated ? {headers: composeAccessTokenHeader()} : null),
    }).then(data => {
        return [null, data];
    }).catch(err => {
        const errorData = err.response.data;
        return [errorData];
    });
}