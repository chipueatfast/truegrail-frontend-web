import { getItemFromStorage } from '~/utils/localStorage';

const correspondingUrl = {
    'factory': '/factory',
    'creator': '/creator',
}

export default function isNotIndentified(role) {
    return new Promise((resolve, reject) => {
        const user = getItemFromStorage('user');
        if (!user) {
            resolve(true);
        };
        if (user) {
            const {
                role: registeredRole,
            } = user;
            reject(new Error(correspondingUrl[registeredRole] || '/'));
        }         
    })
}