import { isProduction } from '~/utils/environment';

export async function simulateLongFetch(duration) {
    if (isProduction()) {
        return;
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    })
}