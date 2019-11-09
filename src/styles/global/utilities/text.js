import { createGlobalStyle } from 'styled-components';
import _var from '~/styles/variableStyles';

export default createGlobalStyle`
    .text-small {
      line-height: 19px;
      font-size: 13px;

      @media screen and (max-width: ${_var.screen.sm}) {
        line-height: 18px;
        font-size: 12px;
      }
   }

  .text-standard {
      line-height: 24px;
      font-size: 16px;
      sup {
        font-size: 8px;
        top: -0.8em;
        left: 0.1em;
        margin-right: 0.2em;
      }

      @media screen and (max-width: ${_var.screen.sm}) {
        line-height: 21px;
        font-size: 14px;
        sup {
          font-size: 6px;
          top: -1em;
        }
      }
  }

  .text-big {
     line-height: 28px;
     font-size: 21px;
     
     sup {
      font-size: 8px;
      top: -1.2em;
      left: 0.2em;
      margin-right: 0.3em;
     }

     @media screen and (max-width: ${_var.screen.sm}) {
        line-height: 24px;
        font-size: 18px;
        sup {
          font-size: 8px;
          top: -1em;
        }
     }
  }

  .text-bigger {
    line-height: 44px;
    font-size: 36px;
    
    sup {
      font-size: 12px;
      top: -1.4em;
      left: 0.2em;
      margin-right: 0.3em;
    }

    @media screen and (max-width: ${_var.screen.sm}) {
      line-height: 28px;
      font-size: 24px;
      sup {
        font-size: 10px;
        top: -1.3em;
      }
    }
  }
  
  .text-center {
    text-align: center;
  }

  .bold {
    font-weight: bold;
  }
  .italic {
    font-style: italic;
  }
`;