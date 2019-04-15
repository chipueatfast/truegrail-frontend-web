import userStore from '~/stores/userStore';

export default function validRole(role) {
    return new Promise((resolve, reject) => {
        if (userStore.role === role) {
            resolve(true);
        } else {
            reject(new Error('/'));
        }
        
    })
}