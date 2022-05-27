import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Podkova:wght@400;500;600;700;800&display=swap');

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
  
}
`

export default GlobalStyles
