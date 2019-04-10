import { dynamicWrapper } from 'react-router-guard';

export default [
    {
        path: '/factory',
        component: dynamicWrapper(() => import('../Factory')),
    },
    {
        path: '/creator',
        component: dynamicWrapper(() => import('../Creator')),
    },
    {
        path: '/signin',
        component: dynamicWrapper(() => import('../SignIn')),
    }
]