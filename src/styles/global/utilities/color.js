import { createGlobalStyle } from 'styled-components';
import _var from '~/styles/variableStyles';

export default createGlobalStyle`
    .color-positive {
        color: ${_var.color.green};
    }

    .bg-positive {
        background: ${_var.color.green};
    }
    
    .color-negative {
        color: ${_var.color.orange};
    }

    .color-primary {
        color: ${_var.color.darkGreen};
    }

    .bg-primary {
        background: ${_var.color.darkGreen};
    }

    .bg-negative {
        background: ${_var.color.red};
    }

    .color-general {
        color: ${_var.color.black};
    }

    .bg-general {
        background: ${_var.color.black};
    }

    .color-white {
        color: white;
    }
    .bg-white {
        background: white;
    }
`;