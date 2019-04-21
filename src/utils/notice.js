import panelStore from '~/stores/panelStore';

export const showNotice = (_variant, _message, _duration = 5000) => {
    panelStore.showNotice({
        _variant,
        _message,
        _duration,
    })
}