import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {DragDropContext} from 'react-beautiful-dnd';

import { hourSelector, minutesState } from './atoms';


function App() {
  const [minutes, setMinutes] = useRecoilState(minutesState);
  //const hours = useRecoilValue(hourSelector);
  //Selector은 set함수 반환 안 해줌(RecoilState 사용 불가). 이미 selector에서 처리하기 때문
  //가 아니라 selector에서 set함수를 따로 반환해주어야 함 (아래 참고)

  //왜 selector을 쓰느냐? => recoil's 전역변수들끼리 상호작용하는 set함수를 만들기 위해서
  const [hours, setHours] = useRecoilState(hourSelector);
  //이 때 setHours는 selector에서 set함수를 받은 것



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


  useEffect(() => {
    console.log("minutes:", minutes);
    console.log("hours:",hours);
  }, [minutes, hours])

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
    </div>
  );
}

export default App;
