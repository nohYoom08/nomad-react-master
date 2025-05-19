import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {Flex} from '../screens/Root';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {IForm,IToDo, categoryState, toDoState} from './atoms'
function CreateToDo(){
    const toDos = useRecoilValue(toDoState);
    const setToDos = useSetRecoilState(toDoState);

    const [category,setCategory] = useRecoilState(categoryState);
    
    const {register, handleSubmit, setValue, formState:{errors}} = useForm<IForm>();
    const handleValid = ({toDo}:IForm)=>{
        //'toDo:IForm' => toDo 자체가 IForm / '{toDo}:IForm' => props객체의 프로퍼티 toDo가 IForm의 프로퍼티 중 하나 
        //(일종의 디스트럭쳐링으로서 props.toDo가 아닌 바로 프로퍼티인 toDo로 접근하게 해주는 거라고 생각)
        setToDos(prev=>[...prev,{id:Date.now(), text:toDo, category}]);
         //'...' => 배열 안의 요소 반환, 앞에 쓰든 뒤에쓰든 상관 없음
         //id는 Date써서 반환 (new Date()도 있지만 Date의 now메소드를 쓰는 것도 방법)
    }

   


    return (
    <form style={{display:'flex', flexDirection:'column', justifyContent:'center'}} onSubmit = {handleSubmit(handleValid)}> 
    {/* 함수를 인자로 가지는 handleSubmit. 인자로 받은 함수에다 data를 인자로 전달 */}

     <input {...register("Email", {
        required:"Fill In!", 
        minLength:10, 
        pattern:
        {
            value:/^[A-Za-z0-9._%+-]+@naver.com$/,
            message:"Only naver.com emails allowed",    // (필수인자)
        }
        })} placeholder="Email" />
     {/* 10글자 제한 및 에러처리
     (minLength 만족 못 함 => type: minLength의 에러객체 전달
        required 써져있는데 안 씀 => type : required의 에러객체 전달
        / minLength가 error객체에서 type이 됨 => 일종의 타입스크립트 에러버전*/}
    {/* pattern에는 정규식 전달 */}
        <span>
            {errors?.Email?.message as string}
            {/* 단언해버리기 + 에러의 name으로 프로퍼티 */}
        </span>


     <input {...register("First Name", 
     {
        required:true, 
        minLength:{
            value:5,
            message:"Your password is too short"
        },
        validate:{
            noNico: async (value)=>
            value.includes("nico")?"no nicos allowed":true, 
            noNick: (value)=>
            value.includes("nick")?"no nicks allowed":true, 
        }
        //'nico를 포함하지 않을 때, true 반환' (value가 true일 때만 오류발생x + 문자열반환시에도 오류발생(그 때 오류구문은 문자열))
        //validate의 값은 저렇게 객체로 관리 가능(하나밖에 없으면 그냥 화살표함수 하나만 써도 되고) + async도 사용 가능
        })} placeholder="First Name" />
    {/* 속성값으로 객체 전달 가능(속성값 및 에러객체) */}
        <span>
            {errors["First Name"]?.message as string}
            {/* 키에 띄어쓰기가 있으면 대괄호표기법으로 */}
        </span>


     <input {...register("Last Name", {required:true, minLength:5})} placeholder="Last Name" />

     <input {...register("Password", {required:"Password is required", minLength:5} )} placeholder="Password" />
     {/* 불린값 대신 문자열 넣으면 error객체에서의 message가 됨 */}

     <input {...register("Password Check",{required:"Password Check is required"})} placeholder="Password Check" />
    {/* 인자가(Password Check) key가 되어 값 전달 */}

    
    <span>{errors['Password Check']?.message}</span>
    <span>{errors?.extraError?.message}</span>
    
     <button>Add</button>

     <input {...register("toDo")} placeholder="toDo" />
 </form>
    )
}

export default CreateToDo;