import axios from 'axios';
import { server } from '~/api/index';
import { getItemFromStorage } from './localStorage';
import userStore from '~/stores/userStore';


export function composeAccessTokenHeader() {
    const accessToken = getItemFromStorage('accessToken');
    return {
        Authorization: "Bearer " + accessToken,
    }
}

export function asyncTryCatchReq(reqParams, isAuthenticated) {
    return axios({
        baseURL: server,
        ...reqParams,
        ...(isAuthenticated ? {headers: composeAccessTokenHeader()} : null),
    }).then(data => {
        return [null, data];
    }).catch(err => {
        if (err.response && err.response.status === 401) {
            userStore.logOut();
        }
        if (!err.response) {
            return [{
                message: 'Can not connect to host',
            }]
        }
        const errorData = err.response.data;
        return [errorData];
    });
}