import { decorate, observable, runInAction, action } from 'mobx';

class PanelStore {
    isNoticeOpen = observable.box(false);
    message = '';
    variant = 'info';
    
    isModalOpen = observable.box(false);
    modalTitle = '';
    renderModalContent = () => null;

    showModal({
        _modalTitle,
        _renderModalContent,
    }) {
        this.isModalOpen.set(true);
        this.modalTitle =  _modalTitle;
        this.renderModalContent = _renderModalContent;
    }

    closeModal() {
        this.isModalOpen.set(false);
    }

    closeNotice() {
        this.isNoticeOpen.set(false);
    }

    showNotice({_message, _variant, _duration}) {
        this.isNoticeOpen.set(true);
        this.variant = _variant;
        this.message = _message;
        setTimeout(() => {
            runInAction('close notice',() => {
                this.isNoticeOpen.set(false);
            });
        }, _duration);
    }

}
decorate(PanelStore, {
    isNoticeOpen: observable,
    isModalOpen: observable,
    message: observable,
    variant: observable,
    renderModalContent: observable,
    showNotice: action.bound,
    showModal: action.bound,
    closeModal: action.bound,
})
export default new PanelStore();