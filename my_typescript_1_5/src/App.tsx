import React from 'react';
import Circle from './Circle';

import {useState, useEffect} from 'react';

import styled from 'styled-components';

const Container= styled.div`
  background-color:${(props)=>props.theme.bgColor}; 
  //props는 상위 컴포넌트에 접근 => app의 상위컴포넌트는 index.tsx이므로, index.tsx에 있는 providertheme에 있는 theme에 접근한 것임(index.tsx참고)
`;
const H1 = styled.h1`
  color:${props => props.theme.textColor};
`;


function App() {
  const [value,setValue]= useState("");
  const onChange = (event:React.FormEvent<HTMLInputElement>) =>{  //html의 input요소의 인터페이스
    //console.log(event.currentTarget.value)
    const {
      currentTarget:{value},
    }= event;
    setValue(value);
    }
  const onSubmit = (event:React.FormEvent<HTMLFormElement>) =>{ //html의 form요소의 인터페이스
     event.preventDefault();
     console.log("hello",value); 
  }
  return (
    <Container>
      <form onSubmit={onSubmit}>
        <input 
        value={value}
        type="text" 
        placeholder="username"
        onChange={onChange}
        ></input>
      </form>

      <H1>protected</H1>

      <Circle bgColor='teal' borderColor='skyblue' ></Circle>
      <Circle text='im here' bgColor='tomato' ></Circle>
    </Container>
  );
}

export default App;
