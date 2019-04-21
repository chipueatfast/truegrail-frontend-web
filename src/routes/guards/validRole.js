import userStore from '~/stores/userStore';

const correspondingUrl = {
    'factory': '/factory',
    'creator': '/creator',
}

export default function validRole(role) {
    return new Promise((resolve, reject) => {
        if (userStore.role === role) {
            resolve(true);
        } else {
            reject(new Error(correspondingUrl[userStore.role] || '/'));
        }
        
    })
}