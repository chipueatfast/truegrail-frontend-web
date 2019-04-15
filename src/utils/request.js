export { default as API } from '../api';
const checkStatusCode = (response) => {
    if ((response.status >= 200 && response.status <= 300) || (response.status === 404)) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
};

const parseJSON = (response) => {
    if (response.status >= 400) {
        return {
            status: false,
            statusCode: response.status,
            err: response.statusText,
        }
    }
    if (response.status === 204 || response.status === 201) {
        return {
            status: true,
        };
    }
   return response.json();
};

const request = ({
    url,
    method = 'GET',
    body = null,
    options = {},
} = {}) => {
    const requestOption = options || {};
    requestOption.method = method;
    requestOption.mode = 'cors';
    requestOption.headers = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
    });
    if (body) {
        requestOption.body = JSON.stringify(body);
    }
    return fetch(url, requestOption)
        .then(checkStatusCode)
        .then(parseJSON)
        .then(
        data => {
            if (data.error && data.error.message) {
                throw new Error(data.error.message);
            }
            return data;
        })
        .catch( err => {
                return { err };
            }
        );
};

export default request;
