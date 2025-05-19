 import styled from "styled-components";
 import {useState,useEffect} from 'react';
 
interface ContainerProps{ //=> 스타일 컴포넌트, 객체에 상속 가능
    bgColor:string;
    borderColor:string;
}

const Container = styled.div<ContainerProps>`   // 변수 type 정하는 유형 1
width:200px;
height:200px; 
background-color:${props=>props.bgColor};
border:4px solid ${props=>props.borderColor};
border-radius:50%;
`;

interface CircleProps{
    bgColor:string;
    borderColor?:string;    //얘가 있든 말든 상관 없음(찡찡 안 댐)
    text?:string;
}

function Circle({bgColor,borderColor,text='default text'}:CircleProps){ 
    //이 때 ='default text'는 '키 = 값'의 형태가 아닌 그냥 default값 주는 typescript문법
    //정하는 유형 2 + 상위 컴포넌트에서도 보내달라고 찡찡댐(string or undefined)


    //default text => 이런 식으로 기본값 줄 수도 있 음

    const [counter,setCounter]=useState<string |  number>(1);
    //setCounter("hello"); 이건 에러남. 초기값을 기준으로 counter가 반드시 number인거 확인 
    // '|' string 또는 number가 자료형이 될 수 있다
    return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>{text}</Container>  
    //container에서는 borderColor가 필수이므로 '??'로 기본값을 준다 (하지만 기본값 또한 string으로) 
    // => 쌩판 undefined 등 값이 잘 안 들어오는 경우 개선
 }
 export default Circle;

 interface PlayerShape{
    name:string;
    age:number;
     
 }
 const sayHello = (playerObj:PlayerShape)=>`Hello ${playerObj.name}, you are ${playerObj.age} old.`;
//유형 3


/* 기본적으로 "객체 : 인터페이스" 구조. 객체에 자료형이라는 족쇄를 매달아주는 인터페이스를 상속한다고 생각*/


 sayHello({name:'James', age:12});
 //sayHello({name:'James', age:12, home:'finding'}); <=home은 PlayerShape에 정의가 안 됐기 때문에 사용 불가


 //npm i --save-dev @types/styled-components
 //위와 같은 형식으로 javascript의 라이브러리를 typescript에 갖다쓰기