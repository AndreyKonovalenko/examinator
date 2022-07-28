import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

@import url(${({ theme }) => theme.font});

  * {
    box-sizing: border-box;
  }
  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text.onBackground};
    font-family: 'Podkova', serif;
    font-size: 1.15em;
    margin: 0;
  }
  p {
    line-height: 1.5;
  }

  button { font-family: inherit }
  
}
`;

export default GlobalStyles;
