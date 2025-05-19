import { createGlobalStyle } from 'styled-components';
import {darkTheme,lightTheme} from './theme';


const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&display=swap');
    // 적용시킬 css 입력
    *{
        box-sizing: border-box;
    }
    a{
        text-decoration: none;
        color: inherit;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 20px;
        vertical-align: baseline;

        color:${({theme})=>theme.colors.textColor};
    }
    body{
        line-height: 1;
        font-family: 'Nanum Myeongjo', sans-serif;

        background-color:${props=>props.theme.colors.bgColor};
        //ThemeProvider의 props인 theme 활용법
        margin-bottom: 100px;
    }
    ol, ul{
        list-style: none;
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }
`;

export default GlobalStyles;