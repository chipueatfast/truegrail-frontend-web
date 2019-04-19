import { observable, action, decorate } from 'mobx';

import { getItemFromStorage, storeItem, removeItemFromStorage } from '~/utils/localStorage';
import history from '~/utils/history';

class UserStore {
    role;
    address;

    constructor() {
        if (!getItemFromStorage('user')) {
            const user = {
            };
            storeItem('user', JSON.stringify(user));
        }

        const {
            role,
            address,
        } =  getItemFromStorage('user') || {
            role: '',
            address: '',
        };
        this.role = role;
        this.address = address;
    }

    logOut() {
        removeItemFromStorage('user');
        history.push('/signin');
    }
    
    updateUserProperty = (key, value) => {
        this[key] = value;
        const user = getItemFromStorage('user');
        user[key] = value;
        storeItem('user', JSON.stringify({...user}));
    }   

}

decorate(UserStore, 
    {
        role: observable,
        updateUserProperty: action.bound,
    });

export default new UserStore();
