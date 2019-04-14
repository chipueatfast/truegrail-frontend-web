import { dynamicWrapper } from 'react-router-guard';

import { validRole } from './guards';


export default [
    {
        canActivate: [validRole.bind(null, 'factory')],
        path: '/factory',
        component: dynamicWrapper(() => import('../Factory')),
    },
    {
        canActivate: [validRole.bind(null, 'creator')],
        path: '/creator',
        component: dynamicWrapper(() => import('../Creator')),
    },
    {
        path: '/signin',
        component: dynamicWrapper(() => import('../SignIn')),
    }
]