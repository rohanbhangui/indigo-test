import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
  }
`;
 
export default GlobalStyle;