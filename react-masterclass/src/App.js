import styled, { keyframes } from 'styled-components';

function App() {

  const Title = styled.h1`
  color:${(props) => props.theme.textColor}
  `
  /* index에서 props로 theme변수에 접근 + textColor까지 접근 */

  //keyframes 객체 => animation 객체
  const rotateAnimation = keyframes`  
   0% {
     transform:rotate(0deg);
     border-radius:0;
   }
   50%{
     transform:rotate(360deg);
     border-radius:50px;
   }
   100%{
    transform:rotate(0deg);
    border-radius:0;
   }
   `;
  //from-to or 0~100%


  const Father = styled.div`
  background-color:skyblue;
  width:100px;
  height:100px;

  display:flex;
  `;

  const Emoji = styled.span`
font-size:36px;
`;

  const Box = styled.div`
  background-color : ${(props) => props.bgColor};
  width : 100px;
  height : 100px;
  animation:${rotateAnimation} 1s linear infinite;
   /* 애니메이션 활용 */

  display:flex;
  justify-content:center;
  align-items:center;

  ${Emoji}{
    /* 이모지가 어떤 태그인지 중요하지 않음 (새로만든 태그 직접 타겟)*/
    font-size:30px;
    &:hover{
      font-size:100px;
    }
    &:active{
      opacity:0;
    }
  }
  `;
  //태그 내 다른 태그에 스타일 적용하는 법(span)



  const Circle = styled(Box)`
  background-color : ${(props) => props.bgColor};
  border-radius : 50px;
  `;
  //인자 전달 + Box 스타일 상속

  const Text = styled.span`
  color:white;
  `;

  const Btn = styled.button`
  color:white;
  background-color:tomato;
  border:0; 
  border-radius:15px; 
  `;

  const Input = styled.input.attrs({ required: true, minLength: 10 })`
  background-color:pink;
  border:0;
  `;

  const Wrapper = styled.div`
  display:flex;
  width:100vw;
  height:100vh;
  background-color:${(props) => props.theme.backgroundColor};
  padding:0;
  margin:0;
  `;
  /* index에서 props로 theme변수에 접근 + textColor까지 접근 */



  return (
    <Wrapper>
    <div style={{ display: 'flex' }}>
          <div style={{ backgroundColor: 'teal', width: 100, height: 100 }}>
          </div>
          <div style={{ backgroundColor: 'tomato', width: 100, height: 100 }}>
          </div>

          <Father>
            <Text>Hello</Text>
          </Father>

          <Box bgColor='teal'>
            <Btn>Log in</Btn>
            <Btn as='a' href='/'>As A</Btn>
            {/* Btn의 스타일을 상속받으면서 button이 아닌 a 태그로 전환 */}
          </Box>
          <Box bgColor='tomato'>
            <Input></Input>
          </Box>
          <Circle bgColor='skyblue'></Circle>

          <Wrapper>
            <Box bgColor='blue'><Emoji>😀</Emoji></Box>
          </Wrapper>
      
    </div>
    </Wrapper>
  );
}

export default App;
