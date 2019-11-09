import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    .center {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .wrap {
      flex-wrap: wrap;
    }
    
    .flex {
      display: flex;
    }
    
    .col {
      flex-direction: column;
    }
    
    .row {
      flex-direction: row;
    }
    
    .w-100 {
      width: 100%;
    }
    
    .align-center {
      align-items: center;
    }
    
    .align-start {
      align-items: start;
    }
    
    .justify-between {
      justify-content: space-between;
    }
    
    .justify-center {
      justify-content: center;
    }
    
    .justify-stretch {
      justify-content: stretch;
    }
    
    .justify-start {
      justify-content: flex-start;
    }
`;