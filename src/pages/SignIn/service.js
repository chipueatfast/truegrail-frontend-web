import qs from 'querystring';
import { asyncTryCatchReq } from '~/utils/customAxios'; 
import { storeItem } from '~/utils/localStorage';
import API from '~/api';
import history from '~/utils/history';

export async function signIn({
    email,
    password,
}) { 
    const [err, rs] = await asyncTryCatchReq({
        method: 'post',
        url: API().signIn(),
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
            grant_type : 'password',
            username: email.trim(),
            password,
        }),
        auth: {
            username: process.env.REACT_APP_CLIENT_ID,
            password: process.env.REACT_APP_CLIENT_SECRET,
        }
    });
    if (rs && rs.data) {
        const {
            user,
            accessToken,
            refreshToken,
        } = rs.data;
        const {
            role,
        } = user;
        storeItem('user', JSON.stringify(user));
        storeItem('accessToken', accessToken);
        storeItem('refreshToken', refreshToken);
        if (role) {
            console.log('it go here');
            console.log(role);
            await history.push(`/${role}`);         
            return {err, rs};
        }
    }
    return {
        err,
    };
}

