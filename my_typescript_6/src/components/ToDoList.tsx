import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {Flex} from '../screens/Root';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {Categories, categoryState, IForm,IToDo, toDoSelector, toDoState} from './atoms'
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
// function ToDoList() {
//     const [toDo, setToDo] = useState<string>("");
//     const [toDoError, setToDoError] = useState("");
//     const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//         const { currentTarget: { value } } = event;
//         setToDoError("");
//         setToDo(value);
//     }
//     const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         console.log(toDo);
//         if (toDo.length < 10) {
//             return setToDoError("To do should be longer");
//         }
//         console.log("submit");
//     }
//     return <div>
//         <form onSubmit={onSubmit}>
//             <input onChange={onChange} placeholder="Write a to do" />
//             <button>Add</button>
//             {toDoError!=="" ? toDoError : null}
//         </form>
//     </div>
// }




function ToDoList(){
    const [toDos, setToDos] = useRecoilState(toDoState);
    //디스트럭쳐링 => const [a,setA]=useState(b) 방식으로 활용
    //const [toDo, doing, done] = useRecoilValue(toDoSelector);
    //selector에서 이차원 배열 반환 시, 각자 toDo, doing, done에 대입
    console.log("toDos",toDos);
    // console.log("toDo, doing, done", toDo,doing,done);

    const toDos2 = useRecoilValue(toDoSelector);


    const [category,setCategory] = useRecoilState(categoryState)
    const onInput = (event:React.FormEvent<HTMLSelectElement>)=>{
        setCategory(event.currentTarget.value as any);
        //as any로 단언하는 이유 : categories라는 새로운 타입으로 받아야 하는데 event.currentTarget.value는 string으로 받기 때문. 이를 그냥 둘이 똑같은거라고 말해주면 됨
    }

    // const value = useRecoilValue(toDoState);
    // const modFn = useSetRecoilState(toDoState);

    const {register, 
        watch, 
        handleSubmit, 
        formState:{errors},
        setError}
        = useForm<IForm>({
        defaultValues:{
             Email:"@naver.com",
        }
        });
    //입력과 출력함수
    //useForm의 defaultValues 속성


    const handleValid = ({toDo}:IForm)=>{
        //'toDo:IForm' => toDo 자체가 IForm / '{toDo}:IForm' => props객체의 프로퍼티 toDo가 IForm의 프로퍼티 중 하나 
        //(일종의 디스트럭쳐링으로서 props.toDo가 아닌 바로 프로퍼티인 toDo로 접근하게 해주는 거라고 생각)
        setToDos(prev=>[...prev,{id:Date.now(), text:toDo, category}]);
         //'...' => 배열 안의 요소 반환, 앞에 쓰든 뒤에쓰든 상관 없음
         //id는 Date써서 반환 (new Date()도 있지만 Date의 now메소드를 쓰는 것도 방법)
    }
    const onValid = (data:IForm) => {
        console.log("data",data); 
        if(data.Password!==data["Password Check"]){
            setError("Password Check",{message:"Password are not the same"},{shouldFocus:true});
            //첫 번째 인자는 수정할 오류를 적용할 키값, 두 번째 인자는 어떤 메세지를 띄울지, 세 번째 인자는 오류발생시 해당 input에 focus
        }
        setError('extraError',{message:"Server offline."});
        //errors에 일단 한 개도 안 걸릴 때 실행
    }



    console.log("register",register("Email"));
    //'name'에 toDo전달 
    console.log("watch",watch());
    console.log("formState.errors", errors);
    // handleSubmit 실행 시 실행됨
    console.log("toDos", toDos);

    console.log("category:",category);

    return <Flex style={{flexDirection:'column'}}>
        <h1>To Dos</h1>
        <hr/>
         {/* <form style={{display:'flex', flexDirection:'column', justifyContent:'center'}} onSubmit = {handleSubmit(onValid)}>  */}
         <CreateToDo></CreateToDo>
         {toDos2?.map((toDo,index)=> <ToDo key={index} {...toDo}/>)}
         <br/>
         <h2>SELECTION</h2>
         <hr/>
        <select onInput={onInput}>
            <option value = {Categories.TO_DO}>To Do</option>
            <option value = {Categories.DOING}>Doing</option>
            <option value = {Categories.DONE}>Done</option>
        </select>
    </Flex>
}

export default ToDoList;