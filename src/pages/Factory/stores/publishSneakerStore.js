import { observable, action } from 'mobx';

class publishSneakerStore {

    @observable batchInfo = {
        brand: '',
        model: '',
        size: '',
        colorway: '',
        releaseDate: undefined,
        quantity: 0,
        limitedEdition: undefined,
    };
    
    @observable labels = [];

    // label is the ID of sneaker
    @action.bound
    setLabels(labels) {
        this.labels = labels;
    }

    @action.bound
    setBatchInfo(batchInfo) {
        this.batchInfo = batchInfo;
    }
}

export default new publishSneakerStore();