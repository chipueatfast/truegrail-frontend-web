import React from 'react';
import Element from './global/elements';
import Utility from './global/utilities';

function GlobalStyle() {
    // const FontLoad = React.lazy(() => import('~/styles/global/settings/fonts'));
    return (
        <>
            {/* <React.Suspense fallback={null}>
                <FontLoad />
            </React.Suspense> */}
            <Element />
            <Utility />
        </>
    )
}

export default GlobalStyle;
