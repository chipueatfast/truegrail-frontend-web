import { observable, action } from 'mobx';
import request, { API } from '~/utils/request';
import { showNotice } from '~/utils/notice';
import userStore from '~/stores/userStore';
// import { checkOwnership } from '../service';

class CollectionStore {
    @observable sneakers = [];
    @observable fetched = false;

    @action.bound
    async fetchCollection() {
        this.fetched = true;
        const rs = await request({
            url: API().sneakerCollection(userStore.address),
            method: 'GET',
        });
        if (!rs.err) {
            rs.forEach(async snkr => {
                if(true) {
                    this.sneakers.push(snkr);
                }
            });
        }
    }

    @action.bound
    async removeSneaker(sneakerId, newAddress) {
        this.sneakers = this.sneakers.filter(snkr => snkr.id !== Number(sneakerId));
        showNotice('success', `Tell your buyer of ${sneakerId} to check her/his inventory (at ${newAddress})`);
    }
}

export default new CollectionStore();