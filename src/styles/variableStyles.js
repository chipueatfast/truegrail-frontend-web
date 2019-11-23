import React from 'react';

export const addGlobalStyle = (component, globalClassNames) => (props) => {
    const Component = component;
    const attachClassname = props.className || '';
    return <Component {...props} className={`${globalClassNames.join(' ')} ${attachClassname}`} />;
};

export default {
    font: {
        desktop: {
            standard: '16px',
        },
    },
    color: {
        green: '#146062',
        darkGreen: '#146062',
        red: '#d0021b',
        black: '#19181B',
        orange: '#FF773F',
        gray: '#B0ACA8',
        white: '#FEFDF6',
    },
    screen: {
        xs: '480px',
        xsMax: '767px',
        sm: '768px',
        smUp: '769px',
        smMax: '991px',
        md: '992px',
        mdMax: '1199px',
        lg: '1200px',
        lgMax: '1280px',
        ipadPro: '1024px',
    },
};
