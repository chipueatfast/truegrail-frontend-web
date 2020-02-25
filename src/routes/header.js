import { dynamicWrapper } from 'react-router-guard';

export default [
    {
        path: '/(factory|creator|outlet|profile|tracing)',
        component: dynamicWrapper(() => import('~/universal-components/Header')),
    },
]