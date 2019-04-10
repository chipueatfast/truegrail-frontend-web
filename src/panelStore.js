import { decorate, observable, runInAction, action } from 'mobx';

class PanelStore {
    isNoticeOpen = false;
    message = '';
    variant = 'info';
    
    isModalOpen = false;
    modalTitle = '';
    renderModalContent = () => null;

    showModal({
        _modalTitle,
        _renderModalContent,
    }) {
        console.log('ne ne', _modalTitle);
        this.isModalOpen = true;
        this.modalTitle =  _modalTitle;
        this.renderModalContent = _renderModalContent;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    showNotice({_message, _variant, _duration}) {
        this.isNoticeOpen = true;
        this.variant = _variant;
        this.message = _message;
        console.log(_duration, 'duration');
        setTimeout(() => {
            runInAction('close notice',() => {
                this.isNoticeOpen = false;
            });
        }, _duration);
    }

    closeNotice() {
        this.isNoticeOpen = false;
    }
}
decorate(PanelStore, {
    isNoticeOpen: observable,
    message: observable,
    variant: observable,
    isModalOpen: observable,
    renderModalContent: observable,
    showNotice: action.bound,
    showModal: action.bound,
    closeModal: action.bound,
})
export default new PanelStore();