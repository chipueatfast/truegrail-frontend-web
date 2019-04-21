import { dynamicWrapper } from 'react-router-guard';

export default [
    {
        path: '/(factory|creator|outlet)',
        component: dynamicWrapper(() => import('~/universal-components/Header')),
    },
]