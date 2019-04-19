import { dynamicWrapper } from 'react-router-guard';

export default [
    {
        path: '/(factory|creator)',
        component: dynamicWrapper(() => import('~/universal-components/Header')),
    },
]