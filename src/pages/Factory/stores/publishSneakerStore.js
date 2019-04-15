import { observable, action } from 'mobx';

class publishSneakerStore {

    batchInfo = observable.box({
        brand: '',
        model: '',
        size: '',
        colorway: '',
        releaseDate: undefined,
        quantity: 0,
        limitedEdition: undefined,
    })
    
    labels = observable.array([]);

    @action.bound
    addLabel(label) {
        this.labels.push(label);
    }
}

export default new publishSneakerStore();