import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "../theme";
import GlobalStyles from "../GlobalStyles";
import styled from 'styled-components';

import ToDoList from "../components/ToDoList";

function Root(){
    return <div>
        I'm Root
        <ThemeProvider theme = {darkTheme}>
            <GlobalStyles/>
            <ToDoList/>
            <Outlet/>
        </ThemeProvider>
    </div>
}

export default Root;

export const Flex = styled.div`
display:flex;
justify-content:center;
align-items:center;
`;