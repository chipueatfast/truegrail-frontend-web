import { getItemFromStorage } from '~/utils/localStorage';

const correspondingUrl = {
    'factory': '/factory',
    'creator': '/creator',
    'collector': '/lab',
}

export default function isNotIndentified(role) {
    return new Promise((resolve, reject) => {
        const user = getItemFromStorage('user');
        if (!user || !user.id) {
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