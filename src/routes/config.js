import { dynamicWrapper } from 'react-router-guard';

import { validRole, isNotIndentified } from './guards/index';


export default [
    {
        path: '/profile',
        component: dynamicWrapper(() => import('~/pages/Profile')),
    },
    {
        path: '/lab',
        component: dynamicWrapper(() => import('~/pages/Lab'))
    },
    {
        path: '/sim',
        component: dynamicWrapper(() => import('~/pages/SimUser')),
    },
    {
        canActivate: [validRole.bind(null, 'factory')],
        path: '/outlet',
        component: dynamicWrapper(() => import('~/pages/Outlet')),
    },
    {
        canActivate: [validRole.bind(null, 'factory')],
        path: '/factory',
        component: dynamicWrapper(() => import('../pages/Factory')),
    },
    {
        canActivate: [validRole.bind(null, 'factory')],
        path: '/tracing',
        component: dynamicWrapper(() => import('../pages/Tracing')),
    },
    {
        path: '/hardcopy',
        component: dynamicWrapper(() => import('../pages/Factory/HardCopy')),
    },
    {
        canActivate: [validRole.bind(null, 'creator')],
        path: '/creator',
        component: dynamicWrapper(() => import('../pages/Creator')),
    },
    {
        canActivate: [isNotIndentified],
        path: '/signin',
        component: dynamicWrapper(() => import('../pages/SignIn')),
    },
    {
        redirect: '/signin',
        path: '/',
        component: dynamicWrapper(() => import('../pages/SignIn')),
    },
]