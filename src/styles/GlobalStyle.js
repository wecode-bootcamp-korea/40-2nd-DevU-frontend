import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}

* {
  box-sizing: border-box;
}

body {
  font-family:'Noto Sans KR', sans-serif;
}

a {
  color: #787878;
  text-decoration: none;
}
`;

export default GlobalStyle;
