import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';

import { hourSelector, minutesState, toDosState } from './atoms';
import styled from 'styled-components';

// ● StrictMode 사용시 react-beatiful-dnd이 작동 안되는 이유.
// react-beatiful-dnd은 디버깅을 위해 Life cycle을 두 번 실행 하는데
// 이 과정에서 등록된 Droppable의 ref가 사라지는 이슈가 있다. 
// ( useLayoutEffect -> useEffect 과정까진 ref가 살아있지만
// layoutEffectCleanUp -> effectCleanup 과정에서 ref가 사라짐. )

// ● 해결 방법
// 1. StrictMode를 해제
// 2. requestAnimationFrame을 불러 paint 이후 Droppable 등록.
// https://github.com/atlassian/react-beautiful-dnd/issues/2399
// 3. dnd 대신 https://dndkit.com/을 사용


function App() {
  const [minutes, setMinutes] = useRecoilState(minutesState);
  //const hours = useRecoilValue(hourSelector);
  //Selector은 set함수 반환 안 해줌(RecoilState 사용 불가). 이미 selector에서 처리하기 때문
  //가 아니라 selector에서 set함수를 따로 반환해주어야 함 (아래 참고)

  //왜 selector을 쓰느냐? => recoil's 전역변수들끼리 상호작용하는 set함수를 만들기 위해서
  const [hours, setHours] = useRecoilState(hourSelector);
  //이 때 setHours는 selector에서 set함수를 받은 것


  const [toDos,setTodos]=useRecoilState(toDosState);
  //배열 반환 디스트럭쳐링(기본)


  const onChange_minutes = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setMinutes(+event.currentTarget.value);
    //input에서 넘어오는 값은 무조건 stirng이니까 set함수에서 타입충돌 일어남. Number화 해줄 것
    //'+'는 Number화 해주는 연산자
  }
  const onChange_hours = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setHours(+event.currentTarget.value);
  }

  const onDragEnd = ({draggableId, destination, source}:DropResult) => {
    //첫 인자는 'result'고 'DropResult'인터페이스에 따름
    //디스트럭쳐링으로 destination, source 받음

    if(!destination) return;

    setTodos(oldToDos => {
      const copyToDos = [...oldToDos];
      copyToDos.splice(source.index, 1);
      //1. 드래그 중인 항목 배열에서 삭제
      copyToDos.splice(destination?.index,0,draggableId);
      //2. 그리고 목적지 인덱스에 추가(splice로 삭제 및 추가 기능도 가능);
      //draggableId인 이유는 draggableId가 단순 'id'가 아니라 항목(item) 그 자체
      return copyToDos;
    })
    //setState에 화살표함수 사용(return을 이용, 화살표함수의 인자는 현재 state값)
  }


  useEffect(() => {
    console.log("minutes:", minutes);
    console.log("hours:", hours);
  }, [minutes, hours])

  
  console.log("toDos:",toDos);
  return (
    <div>
      <input
        value={minutes}
        onChange={onChange_minutes}
        type="number"
        placeholder="Minutes">
      </input>

      <input
        value={hours}
        onChange={onChange_hours}
        type="number"
        placeholder="Hours">
      </input>

      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId='one'>
              {/* droppable(보드)과 draggable(항목) 구분 */}
              {(magic) => (
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                  {/* droppableProps라는 객체 전달 (droppableProps는 Droppable의 타입정의에서 확인 가능)*/}
                  {toDos.map((item:string,index:number)=>
                  <Draggable draggableId={item} index={index} key = {item}>
                    {/* index, draggableId(string) 꼭 설정해줘야 함 (애니메이션 오류 발생)*/}
                    {(magic) => (
                      <Card ref={magic.innerRef}
                        {...magic.draggableProps}
                        {...magic.dragHandleProps}>
                        <span {...magic.dragHandleProps}>😎</span>{item}</Card>
                      /* dragHandleProps라는 객체 전달 (dragHandleProps는 Draggable의 타입정의에서 확인 가능)*/
                    )}
                  </Draggable>
                  /* magic의 타입(인터페이스)는 DraggableProvided */
                    )}
                    {magic.placeholder}
                    {/* 드래그 앤 드롭 하는동안 높이가 변경 안되도록 도와줌 */}
                </Board>
              )}
              {/* children으로 함수 요구 */}
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>
    </div>
  );
}

export default App;

export const Wrapper = styled.div`
  max-width:480px;
  width:100%;
  margin:0 auto;

  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`;
export const Boards = styled.div`
  width:100%;
  display:grid;
  grid-template-columns:repeat(3,1fr);

`;
export const Board = styled.div` 
  padding:20px 10px;
  padding-top:30px;
  background-color:${props => props.theme.boardColor};
  border-radius:12px;

  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`;

export const Card = styled.div`
  width:390px;
  background-color:${props => props.theme.cardColor};
  text-align:center;
  border:1px solid teal;
  border-radius:4px;


  padding:10px 10px;
`;