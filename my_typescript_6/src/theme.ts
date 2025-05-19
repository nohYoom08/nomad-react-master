import {DefaultTheme} from 'styled-components';

export const darkTheme:DefaultTheme={
     colors:{
     bgColor:"#3498db",
     textColor:"white",
     btnColor:"tomato", 
     }
};
export const lightTheme:DefaultTheme={
     colors:{
     bgColor:"whitesmoke",
     textColor:"black",
     btnColor:"tomato", 
     }
};
//중괄호 안에 중괄호 즉 객체 안에 객체가 못 들어가는 상황은 단순 배열처럼 {{},{},{}}가 안 되는 것.
//객체라면 응당 키-값의 쌍이 존재해야하므로, {a:{},b:{},c:{}}의 형식은 가능. 이중 객체가 안 되는게 절대 아님
