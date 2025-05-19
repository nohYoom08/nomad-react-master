import {Outlet} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Header from "../components/Header";
import GlobalStyles from "../GlobalStyles";
import styled from 'styled-components';

import {ReactQueryDevtools} from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../theme';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

function Root(){
    const isDark = useRecoilValue(isDarkAtom);
    return <div>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            {/* state를 사용하기 위해 Root로 ThemeProvider를 옮김 */}
            <Header/>
            <GlobalStyles/>
            <ReactQueryDevtools initialIsOpen={true}/>
            <Outlet context={{darkMode:true}}/>
            {/* 하위스크린에 인자전달 (물론 자손까지가 아니라 자식한테까지만) */}
        </ThemeProvider>
    </div>
}
//Outlet => Root의 자식요소를 Root에서 렌더링해줌. Root의 자식요소는 Router에서 확인(?)

export default Root;

export const Flex = styled.div`
display:flex;
justify-content:center;
align-items:center;
`;