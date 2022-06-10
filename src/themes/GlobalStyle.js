import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body, html {
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
    }

    * {
        box-sizing: border-box;
    }
`;

export default GlobalStyles;
