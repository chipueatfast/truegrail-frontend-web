import { dynamicWrapper } from 'react-router-guard';

export default [
    {
        path: '/factory',
        component: dynamicWrapper(() => import('../Factory')),
    }
]