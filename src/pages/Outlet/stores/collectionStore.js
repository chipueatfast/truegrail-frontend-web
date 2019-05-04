import { observable, action, toJS } from 'mobx';
import request, { API } from '~/utils/request';
import { showNotice } from '~/utils/notice';
import userStore from '~/stores/userStore';
import { checkOwnership } from '../service';

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
                if(await checkOwnership(snkr.id)) {
                    this.sneakers.push(snkr);
                }
            });
        }
    }

    @action.bound
    async removeSneaker(sneakerId, newAddress) {
        this.sneakers = this.sneakers.filter(snkr => snkr.id !== Number(sneakerId));
        const rs = await request({
            url: API().changeOwnership(),
            method: 'PATCH',
            body: {
                sneakerId,
                newAddress: newAddress.toLowerCase(),
            }
        });
        if (rs.status) {
            showNotice('success', 'Tell your buyer to check her/his inventory');
        }
    }
}

export default new CollectionStore();