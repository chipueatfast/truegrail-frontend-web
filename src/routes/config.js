import { dynamicWrapper } from 'react-router-guard';

import { validRole } from './guards';


export default [
    {
        canActivate: [validRole.bind(null, 'factory')],
        path: '/factory',
        component: dynamicWrapper(() => import('../pages/Factory')),
    },
    {
        canActivate: [validRole.bind(null, 'creator')],
        path: '/creator',
        component: dynamicWrapper(() => import('../pages/Creator')),
    },
    {
        path: '/signin',
        component: dynamicWrapper(() => import('../pages/SignIn')),
    }
]