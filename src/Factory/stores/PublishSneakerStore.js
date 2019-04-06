import { decorate, observable, action } from 'mobx';

class PublishSneakerStore {
    labels = [];

    addLabel(label) {
        this.labels.push(label);
    }
}

decorate(PublishSneakerStore, {
    labels: observable,
    addLabel: action.bound,
})

export default new PublishSneakerStore();