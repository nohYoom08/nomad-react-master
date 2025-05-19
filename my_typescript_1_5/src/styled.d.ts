import styled from 'styled-components';


declare module 'styled-components'{
    export interface DefaultTheme{
        colors:{
            main?:string;
            secondrRy?:string;

            textColor:string;
            bgColor:string;
            btnColor:string;
        }
    }
};