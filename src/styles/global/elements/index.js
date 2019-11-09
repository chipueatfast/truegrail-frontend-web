import {createGlobalStyle} from 'styled-components';
import _var from '~/styles/variableStyles';

export default createGlobalStyle`
    body {
        font-family: 'Fira Sans';
        font-size: ${_var.font.desktop.standard};
    }
`;
