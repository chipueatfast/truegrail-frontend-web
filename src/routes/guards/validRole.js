import { getItemFromStorage } from '~/utils/localStorage';

const correspondingUrl = {
    'factory': '/factory',
    'creator': '/creator',
}

export default function validRole(role) {
    return new Promise((resolve, reject) => {
        const user = getItemFromStorage('user');
        if (user) {
            const {
                role: registeredRole,
            } = user;
            if (registeredRole === role) {
                resolve(true);
            } else {
                reject(new Error(correspondingUrl[registeredRole] || '/'));
            }
        }         
    })
}