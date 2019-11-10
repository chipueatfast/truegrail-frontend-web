import { getItemFromStorage } from '~/utils/localStorage';

export function composeAccessTokenHeader() {
    const accessToken = getItemFromStorage('accessToken');
    return {
        Authorization: "Bearer " + accessToken,
    }
}

export function renewAccessToken() {
    // TODO next
}