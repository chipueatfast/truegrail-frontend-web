import { showNotice } from 'utils/notice';

export const notifyNewSneaker = async (sneakerId) => {
    showNotice('info',`Successfully issued sneaker no.${sneakerId}`);
}