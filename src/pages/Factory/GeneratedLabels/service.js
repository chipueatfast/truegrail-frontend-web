import request, { API } from 'utils/request';
import panelStore from '~/stores/panelStore'; 

export const addSneakerToDatabase = async (data) => {
    const rs = await request({
        url: API().sneaker(),
        method: 'POST',
        body: data,
    });
    if (rs.status) {
        panelStore.showNotice({
            _variant: 'info',
            _message: 'Successfully issued',
            _duration: '5000', 
        })
    }
}