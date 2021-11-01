import reset from "styled-reset";
import { createGlobalStyle, css } from "styled-components";
import palette from "./palette";

const globalStyle = css`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    color: ${palette.black};
    font-family: Noto sans-serif, Noto Sans KR;
  }
`;

const GlobalStyle = createGlobalStyle`
    ${globalStyle};
`;

export default GlobalStyle;
