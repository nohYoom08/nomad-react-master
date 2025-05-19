import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';

const darkTheme={
  textColor:"whitesmoke", 
  backgroundColor:"#111"
}

const lightTheme={
  textColor:"#111",
  backgroundColor:"whitesmoke"
}
//프로퍼티는 서로 똑같이 공유해야함(textColor, backgroundColor)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>
); 
 //라이트모드 다크모드 설정(ThemeProvider)
